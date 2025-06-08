'use client';

import { useEffect, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

export default function BarcodeScanner({ onScan }: { onScan: (result: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    let controls: { stop: () => void };
    
    const scan = async () => {
      try {
        controls = await codeReader.decodeFromVideoDevice(
          undefined, 
          videoRef.current!, 
          (result) => {
            if (result) {
              onScan(result.getText());
            }
          }
        );
      } catch (error) {
        console.error('Scanner error:', error);
      }
    };
    
    scan();
    
    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [onScan]);

  return (
    <div className="relative">
      <video 
        ref={videoRef} 
        className="w-full h-auto border-2 border-pink-500 rounded-md"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border-4 border-pink-500 rounded-lg w-64 h-64"></div>
      </div>
    </div>
  );
}