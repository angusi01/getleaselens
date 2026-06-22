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
    return (<form className="upload-panel" onSubmit={handleSubmit(submit, handleInvalidSubmit)}>
      <label className={`upload-zone ${dragOver ? 'dragging' : ''} ${file ? 'selected' : ''} ${fileError ? 'invalid' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
        <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange}/>
        <span className="document-icon" aria-hidden="true">PDF</span>
        {file ? (<span className="selected-file">
            <strong>{file.name} ({formatFileSize(file.size)})</strong>
            <button type="button" className="text-button file-remove" onClick={(event) => { event.preventDefault(); event.stopPropagation(); clearFile(); }}>
              × Remove
            </button>
          </span>) : (<span>
            <strong>{dragOver ? 'Drop your PDF here' : 'Drag your lease PDF here'}</strong>
            <small>or click to browse. PDF only, max 15MB.</small>
          </span>)}
      </label>
      <p className="trust-copy">Your PDF is deleted from our servers immediately after analysis.</p>
      <div className="pricing-options" role="radiogroup" aria-label="Choose analysis pack">
        {Object.entries(products).map(([key, option]) => (
          <label key={key} className={product === key ? 'selected' : ''}>
            <input type="radio" name="product" value={key} checked={product === key} onChange={() => setProduct(key)}/>
            <span>{option.label}</span>
            <strong>{option.price}</strong>
          </label>
        ))}
      </div>
      {fileError && <p className="text-red-600">{fileError}</p>}
      <button type="submit" disabled={Boolean(status)}>Analyse Your Lease - {products[product].price}</button>
      {status && (<div className="upload-progress" aria-live="polite">
          <div><span style={{ width: `${progress}%`, transition: 'width 2s linear' }}/></div>
          <p>{status}</p>
        </div>)}
    </form>);
}
