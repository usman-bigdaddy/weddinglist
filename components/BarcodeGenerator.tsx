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
      // Create a clone of the element to avoid modifying the original
      const element = qrCodeRef.current.cloneNode(true) as HTMLElement;
      
      // Apply simplified, compatible styles to the clone
      element.style.backgroundColor = '#fdf2f8'; // Hex equivalent of your pink
      element.style.color = '#831843'; // Dark pink text
      element.style.padding = '24px';
      element.style.borderRadius = '8px';
      
      // Temporarily add to document
      element.style.position = 'fixed';
      element.style.left = '-9999px';
      document.body.appendChild(element);

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#fdf2f8', // Solid color fallback
        logging: false,
        useCORS: true,
      });
      
      document.body.removeChild(element);

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
      {/* This div will be cloned for download */}
      <div 
        ref={qrCodeRef}
        className="p-6 bg-[#fdf2f8] rounded-lg shadow-md flex flex-col items-center"
        style={{
          // Using inline styles for critical properties
          backgroundColor: '#fdf2f8',
          color: '#831843',
          minWidth: '250px',
        }}
      >
        <h3 
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Usman & Fatima 
        </h3>
        
        <div className="p-2 bg-white rounded-md">
          <QRCodeSVG 
            value={verificationUrl}
            size={180}
            bgColor="#ffffff"
            fgColor="#831843"
            level="H"
          />
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm font-medium">Verification Code</p>
          <p 
            className="text-2xl font-mono font-bold tracking-wider"
            style={{ color: '#831843' }}
          >
            {otp.match(/.{1,3}/g)?.join(' ')}
          </p>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs">
            Reception: June 28, 2025 at 2:00 PM
          </p>
          <p className="text-xs">
            Arewa House, Kaduna
          </p>
        </div>
      </div>
      
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#831843] hover:bg-[#6b1435] text-white rounded-md transition-colors disabled:opacity-70"
        style={{
          backgroundColor: '#831843',
          color: 'white',
        }}
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download IV
          </>
        )}
      </button>
      
      <p className="text-xs text-center text-[#831843]">
        Save this to your phone or print it for easy access at the reception
      </p>
    </div>
  );
}