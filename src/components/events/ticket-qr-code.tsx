"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function TicketQrCode({ value }: { value: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: 200,
        margin: 1,
        color: {
          dark: "#18181b", // zinc-900
          light: "#ffffff",
        },
      }, (err) => {
        if (err) console.error("Failed to generate QR code", err);
      });
    }
  }, [value]);

  return (
    <div className="bg-white p-3 rounded-2xl border border-zinc-150 flex items-center justify-center shadow-inner">
      <canvas ref={canvasRef} className="max-w-[180px] w-full aspect-square" />
    </div>
  );
}
