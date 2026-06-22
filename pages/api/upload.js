import fs from 'node:fs/promises';
import formidable from 'formidable';
import { sha256Hex } from '../../lib/security';
import { getServiceSupabase } from '../../lib/supabaseClient';
export const config = {
    api: { bodyParser: false },
};
function parseForm(req) {
    const form = formidable({ maxFileSize: 15 * 1024 * 1024, multiples: false });
    return new Promise((resolve, reject) => {
        form.parse(req, (error, _fields, files) => (error ? reject(error) : resolve(files)));
    });
}
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: { code: 'METHOD_NOT_ALLOWED', message: 'Method not allowed.' } });
    const files = await parseForm(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file)
        return res.status(400).json({ error: { code: 'MISSING_FILE', message: 'Please select a PDF file.' } });
    if (file.mimetype !== 'application/pdf')
        return res.status(400).json({ error: { code: 'PDF_REQUIRED', message: 'Only PDF files are supported. Please upload a .pdf file.' } });
    if (file.size > 15 * 1024 * 1024)
        return res.status(400).json({ error: { code: 'FILE_TOO_LARGE', message: 'File must be under 15MB. Please compress your PDF and try again.' } });
    const buffer = await fs.readFile(file.filepath);
    const fileHash = sha256Hex(buffer);
    const supabase = getServiceSupabase();
    const { data: purchase, error } = await supabase
        .from('purchases')
        .insert({ status: 'pending', file_hash: fileHash })
        .select('id')
        .single();
    if (error)
        return res.status(500).json({ error: { code: 'PURCHASE_CREATE_FAILED', message: error.message } });
    const { error: uploadError } = await supabase.storage
        .from('lease-uploads')
        .upload(`${purchase.id}.pdf`, buffer, { contentType: 'application/pdf', upsert: false });
    if (uploadError)
        return res.status(500).json({ error: { code: 'UPLOAD_FAILED', message: uploadError.message } });
    return res.status(200).json({ data: { purchaseId: purchase.id } });
}
