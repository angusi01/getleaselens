import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
const maxFileSize = 15 * 1024 * 1024;
const products = {
    single: { label: 'Single analysis', price: '$9' },
    five_pack: { label: '5-pack', price: '$35' },
};
const schema = z.object({
    file: z.any().refine((value) => value, 'Please upload a lease agreement PDF'),
});
export function UploadForm() {
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [status, setStatus] = useState('');
    const [progress, setProgress] = useState(0);
    const [product, setProduct] = useState('single');
    const fileInputRef = useRef(null);
    const { handleSubmit, setValue } = useForm({
        resolver: zodResolver(schema),
    });
    function formatFileSize(size) {
        return `${(size / 1024 / 1024).toFixed(1)} MB`;
    }
    function clearFile() {
        setFile(null);
        setValue('file', null, { shouldValidate: true });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
    function validate(nextFile) {
        setFileError('');
        if (!nextFile) {
            clearFile();
            return;
        }
        if (nextFile.type !== 'application/pdf' && !nextFile.name.toLowerCase().endsWith('.pdf')) {
            setFileError('Only PDF files are supported. Please upload a .pdf file.');
            clearFile();
            return;
        }
        if (nextFile.size > maxFileSize) {
            setFileError('File must be under 15MB. Please compress your PDF and try again.');
            clearFile();
            return;
        }
        setFile(nextFile);
        setValue('file', nextFile, { shouldValidate: true });
    }
    function handleFileChange(event) {
        validate(event.target.files?.[0] ?? null);
    }
    function handleDrop(event) {
        event.preventDefault();
        setDragOver(false);
        validate(event.dataTransfer.files[0] ?? null);
    }
    async function submit(values) {
        if (!values.file) {
            setStatus('');
            setFileError('Please upload a lease agreement PDF');
            return;
        }
        const fileName = values.file.name;
        setFileError('');
        setProgress(0);
        setStatus('Preparing demo report...');
        window.requestAnimationFrame(() => setProgress(100));
        window.setTimeout(() => {
            window.location.href = `/result?mock=true&file=${encodeURIComponent(fileName)}`;
        }, 2000);
    }
    function handleInvalidSubmit() {
        setStatus('');
        setFileError('Please upload a lease agreement PDF');
    }
    return (<form className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-[0_4px_6px_-1px_rgba(15,23,42,0.05),0_2px_4px_-2px_rgba(15,23,42,0.05)]" onSubmit={handleSubmit(submit, handleInvalidSubmit)}>
      <label className={`flex min-h-[224px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-10 text-center normal-case tracking-normal transition-colors ${fileError ? 'border-red-500 bg-red-50' : dragOver || file ? 'border-[#4f46e5] bg-[#f6f9ff]' : 'border-[#e2e8f0] bg-white hover:bg-[#f6f9ff]'}`} onDragOver={(event) => { event.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
        <input className="hidden" ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange}/>
        <span className={`material-symbols-outlined text-[48px] text-[#4f46e5] transition-transform ${dragOver ? 'scale-110' : ''}`} aria-hidden="true">upload_file</span>
        {file ? (<span className="flex max-w-full flex-col items-center gap-2">
            <strong className="max-w-full break-words font-['Inter'] text-sm font-semibold leading-5 text-[#161c22]">{file.name} ({formatFileSize(file.size)})</strong>
            <button type="button" className="!m-0 !min-h-0 !bg-transparent !p-0 font-['Inter'] text-xs font-medium normal-case tracking-normal text-red-600 hover:text-red-700" onClick={(event) => { event.preventDefault(); event.stopPropagation(); clearFile(); }}>
              Remove
            </button>
          </span>) : (<span className="flex flex-col items-center">
            <strong className="font-['Inter'] text-sm font-semibold leading-5 text-[#161c22]">{dragOver ? 'Drop your PDF here' : 'Drag your lease PDF here or click to browse.'}</strong>
            <small className="mt-1 font-['Inter'] text-xs font-medium leading-4 tracking-[0.02em] text-[#464555]">PDF only, max 15MB</small>
          </span>)}
      </label>
      <div className="mt-8 flex flex-col gap-3" role="radiogroup" aria-label="Choose analysis pack">
        {Object.entries(products).map(([key, option]) => (
          <label key={key} className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 normal-case tracking-normal transition-colors hover:border-[#4f46e5] ${product === key ? 'border-[#4f46e5] bg-[#f6f9ff]' : 'border-[#e2e8f0] bg-white'}`}>
            <span className="flex items-center gap-3">
              <input className="!h-4 !w-4 !shrink-0 !p-0 text-[#4f46e5] accent-[#4f46e5] focus:ring-[#4f46e5]" type="radio" name="product" value={key} checked={product === key} onChange={() => setProduct(key)}/>
              <span className="font-['Inter'] text-sm font-medium leading-5 text-[#161c22]">{option.label}</span>
            </span>
            {key === 'five_pack' ? (<span className="text-right">
              <strong className="block font-['DM_Sans'] text-xl font-semibold leading-7 text-[#161c22]">{option.price}</strong>
              <small className="block font-['Inter'] text-xs font-medium leading-4 tracking-[0.02em] text-[#4f46e5]">Save $10</small>
            </span>) : (<strong className="font-['DM_Sans'] text-xl font-semibold leading-7 text-[#161c22]">{option.price}</strong>)}
          </label>
        ))}
      </div>
      {fileError && <p className="mt-3 font-['Inter'] text-sm leading-5 text-red-600">{fileError}</p>}
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-[#4f46e5] px-6 py-4 font-['Inter'] text-base font-semibold leading-6 text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55" type="submit" disabled={Boolean(status)}>Analyse Your Lease — {products[product].price}</button>
      {status && (<div className="mt-4 grid gap-2" aria-live="polite">
          <div className="h-2 overflow-hidden rounded-full bg-[#e8eef6]"><span className="block h-full bg-[#4f46e5]" style={{ width: `${progress}%`, transition: 'width 2s linear' }}/></div>
          <p className="m-0 text-center font-['Inter'] text-xs font-medium leading-4 tracking-[0.02em] text-[#464555]">{status}</p>
        </div>)}
      <div className="mt-4 flex items-center justify-center gap-2 text-[#464555]">
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">lock</span>
        <span className="font-['Inter'] text-xs font-medium leading-4 tracking-[0.02em]">Secure payment via Stripe</span>
      </div>
    </form>);
}
