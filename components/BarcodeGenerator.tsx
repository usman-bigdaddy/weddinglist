import { QRCodeSVG } from 'qrcode.react';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

export default function BarcodeGenerator({ otp }: { otp: string }) {
  const verificationUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/verify/${otp}`;
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!qrCodeRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(qrCodeRef.current, {
        //backgroundColor: '#fdf2f8',
        //backgroundColor: 'lavenderblush',
        scale: 2 // Higher quality
      });
      
      const link = document.createElement('a');
      link.download = `Wedding-Verification-${otp}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading QR code:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div ref={qrCodeRef} className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
     <div
  ref={qrCodeRef}
  style={{
    backgroundColor: '#fdf2f8',
    padding: '1rem',
    display: 'inline-block',
    borderRadius: '0.5rem',
  }}
>
  <QRCodeSVG 
    value={verificationUrl}
    size={128}
    bgColor="#fdf2f8"
    fgColor="#831843"
    level="H"
    includeMargin={true}
  />
</div>

        <p className="mt-3 text-sm font-medium text-pink-900">Verification Code:</p>
        <p className="text-lg font-mono font-bold text-pink-900">{otp}</p>
        <p className="text-xs text-center text-pink-600 mt-1">
          Reception of Usman & Fatima • June 28, 2025
        </p>
      </div>
      
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-colors disabled:opacity-70"
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Downloading...
          </>
        ) : (
       <>
  Download IV
</>

        )}
      </button>
      
      <p className="text-xs text-center text-pink-500">
        Save this to your phone or print it for easy access at the wedding
      </p>
    </div>
  );
}