import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const { mock, file } = router.query;
  const [showPrintNotice, setShowPrintNotice] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!mock) {
      router.replace('/');
    } else {
      setReady(true);
    }
  }, [router.isReady, mock]);

  if (!router.isReady || !ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <div className="text-gray-600">Loading report...</div>
      </div>
    );
  }

  const handlePrint = () => {
    setShowPrintNotice(true);
    setTimeout(() => {
      window.print();
      setShowPrintNotice(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Demo banner */}
        <div className="bg-yellow-100 text-yellow-800 p-3 text-center rounded-lg mb-8 font-medium">
          SAMPLE REPORT — Demo Preview
        </div>

        {/* File info */}
        {file && (
          <div className="text-sm text-gray-600 mb-6">
            Document: <span className="font-medium">{decodeURIComponent(file)}</span>
          </div>
        )}

        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-[#1a2e4a] mb-4">Summary</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700">Rent increase clause allows maximum 3% annual increase</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700">Break clause: 6 months with 30 days written notice</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-gray-700">Maintenance: landlord responsible for structural repairs</span>
            </li>
          </ul>
        </div>

        {/* Red Flags Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-[#1a2e4a] mb-4">Red Flags</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="text-gray-700">No clear termination notice period specified — could be ambiguous</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="text-gray-700">Rent review tied to market rates without clear calculation method</p>
            </div>
          </div>
        </div>

        {/* Favourable Clauses Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-[#1a2e4a] mb-4">Favourable Clauses</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-gray-700">Pet-friendly clause included with reasonable conditions</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-gray-700">Subletting allowed with landlord approval (not unreasonably withheld)</p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePrint}
            className="bg-[#1a2e4a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#243f62] transition-colors"
          >
            Download Summary
          </button>
        </div>
        {showPrintNotice && (
          <p className="text-center text-sm text-gray-600 mt-3">
            Print dialog opening...
          </p>
        )}

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            body { background: white !important; }
            .bg-yellow-100 { background: #fef3c7 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .bg-white { background: white !important; }
            .border-l-4 { border-left-width: 4px !important; }
            .border-red-500 { border-color: #ef4444 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .border-green-500 { border-color: #22c55e !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .text-green-600 { color: #16a34a !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            button { display: none !important; }
            .shadow-sm { box-shadow: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
