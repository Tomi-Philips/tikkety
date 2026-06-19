// AuthLayout.tsx
import React from 'react';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-white">
      {/* Dynamic Glassmorphism Background - Enhanced Glow */}
      <div className="absolute inset-0 h-full w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"></div>

        {/* Enhanced blurry gradient orbs with more glassmorphic glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/30 dark:bg-blue-500/25 rounded-full blur-[120px] blur-[180px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-1000" />

        <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-[140px] blur-[200px] mix-blend-multiply dark:mix-blend-screen" />

        <div className="absolute top-[20%] right-[15%] w-80 h-80 bg-blue-600/25 dark:bg-blue-800/35 rounded-full blur-[120px] blur-[160px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="w-full max-w-md z-10 flex flex-col">
        <div className="mb-10 text-center flex flex-col justify-center items-center">
          <Image
            src="/tikkety-main-logo.png"
            alt="Tikkety Logo"
            width={144}
            height={40}
            loading="eager"
            style={{ width: "144px", height: "auto" }}
            className="object-contain"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Your seamless event experience</p>
        </div>
        {children}
      </div>
    </div>
  );
}