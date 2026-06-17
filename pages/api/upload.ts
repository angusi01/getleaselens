import fs from 'node:fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { sha256Hex } from '../../lib/security';
import { getServiceSupabase } from '../../lib/supabaseClient';

export const config = {
  api: { bodyParser: false },
};

function parseForm(req: NextApiRequest) {
  const form = formidable({ maxFileSize: 10 * 1024 * 1024, multiples: false });
  return new Promise<formidable.Files>((resolve, reject) => {
    form.parse(req, (error, _fields, files) => (error ? reject(error) : resolve(files)));
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const files = await parseForm(req);
  const file = Array.isArray(files.file) ? files.file[0] : files.file;
  if (!file) return res.status(400).json({ error: 'missing_file' });
  if (file.mimetype !== 'application/pdf') return res.status(400).json({ error: 'pdf_required' });

  const buffer = await fs.readFile(file.filepath);
  const fileHash = sha256Hex(buffer);
  const supabase = getServiceSupabase();
  const { data: purchase, error } = await supabase
    .from('purchases')
    .insert({ status: 'pending', file_hash: fileHash })
    .select('id')
    .single();

  if (error) return res.status(500).json({ error: error.message });

  const { error: uploadError } = await supabase.storage
    .from('lease-uploads')
    .upload(`${purchase.id}.pdf`, buffer, { contentType: 'application/pdf', upsert: false });

  if (uploadError) return res.status(500).json({ error: uploadError.message });
  return res.status(200).json({ purchaseId: purchase.id });
}
