import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function BarcodeGenerator({ otp }: { otp: string }) {
  const verificationUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/verify/${otp}`;
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!qrCodeRef.current) return;

    setIsDownloading(true);
    try {
      // Create a clone with simplified styles
      const element = qrCodeRef.current.cloneNode(true) as HTMLElement;

      // Apply compatible styles
      element.style.backgroundColor = "#fdf2f8";
      element.style.color = "#831843";
      element.style.padding = "24px";
      element.style.borderRadius = "8px";
      element.style.position = "fixed";
      element.style.left = "-9999px";

      // Replace any modern color functions in child elements
      const elements = element.querySelectorAll("*");
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          if (el.style.color.includes("oklch")) el.style.color = "#831843";
          if (el.style.backgroundColor.includes("oklch"))
            el.style.backgroundColor = "#fdf2f8";
        }
      });

      document.body.appendChild(element);

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#fdf2f8",
        logging: false,
        useCORS: true,
      });

      document.body.removeChild(element);

      const link = document.createElement("a");
      link.download = `Wedding-IV-${otp}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error downloading QR code:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main card - using only hex colors */}
      <div
        ref={qrCodeRef}
        className="relative p-6 rounded-lg shadow-md flex flex-col items-center border-2 border-[#fbcfe8]"
        style={{
          backgroundColor: "#fdf2f8",
          color: "#831843",
          minWidth: "250px",
        }}
      >
        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="absolute -top-3 -right-3 flex items-center justify-center gap-1 px-3 py-2 bg-[#831843] hover:bg-[#6b1435] text-white rounded-full shadow-lg transition-colors disabled:opacity-70 z-10"
          title="Download IV Card"
          style={{
            backgroundColor: "#831843",
            color: "white",
          }}
        >
          {isDownloading ? (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span className="sr-only">Download</span>
        </button>

        <h3
          className="text-[4vw] sm:text-[2.5vw] md:text-lg font-bold mb-4 text-center whitespace-nowrap"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#831843",
          }}
        >
          Farida & Najib
        </h3>

        <div
          className="p-2 rounded-md mb-4"
          style={{
            backgroundColor: "white",
          }}
        >
          <QRCodeSVG
            value={verificationUrl}
            size={180}
            bgColor="#ffffff"
            fgColor="#831843"
            level="H"
          />
        </div>

        <div className="text-center mb-4" style={{ color: "#831843" }}>
          <p className="text-sm font-medium">Your Invitation Code</p>
          <p className="text-2xl font-mono font-bold tracking-wider">
            {otp.match(/.{1,3}/g)?.join(" ")}
          </p>
        </div>

        <div className="text-center text-xs" style={{ color: "#831843" }}>
          <p>Reception: August 24, 2025 at 2:00 PM</p>
          <p>
            <a
              href="https://www.google.com/maps?q=Merry+Makers+Event+Centre,+Plot+702+Kashim+Ibrahim+Way+wuse+2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#831843" }}
              className="mt-1 underline"
            >
              Merry Makers Event Centre, Wuse 2, Abuja
            </a>
          </p>
        </div>

        {/* Secondary download button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors disabled:opacity-70 text-sm"
          style={{
            backgroundColor: "#831843",
            color: "white",
          }}
        >
          {isDownloading ? (
            "Downloading..."
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download IV Card
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-center px-4" style={{ color: "#831843" }}>
        Tip: Download or screenshot the IV for easy access at the venue
      </p>
    </div>
  );
}
