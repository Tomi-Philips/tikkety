"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Quote, ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form (40%) - #F8F8F8 with shadow */}
      <div 
        className="w-full lg:w-[40%] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 relative"
        style={{ backgroundColor: '#F8F8F8' }}
      >
        {/* Subtle shadow on the right side */}
        <div className="absolute top-0 right-0 w-8 h-full pointer-events-none" style={{
          background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.04))'
        }} />
        
        <div className="w-full max-w-md z-10">
          {/* Back Arrow */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>
          </div>

          {/* Logo - Link to landing page */}
          <Link 
            href="/" 
            className="block mb-8 text-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/tikkety-main-logo.png"
              alt="Tikkety Logo"
              width={144}
              height={40}
              loading="eager"
              style={{ width: "144px", height: "auto" }}
              className="object-contain mx-auto"
            />
            <p className="text-gray-500 text-sm mt-2">Your seamless event experience</p>
          </Link>
          
          {children}
        </div>
      </div>

      {/* Right Side - Testimonial (60%) - #FDFDFD */}
      <div className="hidden lg:block lg:w-[60%] relative overflow-hidden" style={{ backgroundColor: '#FDFDFD' }}>
        {/* Decorative elements */}
        <div className="absolute inset-0">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Blue accent shapes */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />
          
          {/* Blue dot pattern */}
          <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-blue-200" />
          <div className="absolute bottom-32 right-32 w-3 h-3 rounded-full bg-blue-100" />
          <div className="absolute top-1/2 left-20 w-1.5 h-1.5 rounded-full bg-blue-200" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12">
          <div className="max-w-lg">
            {/* Decorative quote mark */}
            <div className="mb-6">
              <Quote className="w-12 h-12 text-blue-200" />
            </div>
            
            {/* Testimonial quote */}
            <blockquote className="text-2xl md:text-3xl font-semi leading-relaxed text-gray-700">
              "Tikkety completely changed how I manage campus events. I can create ticket tiers, track sales in real time, and manage attendees without juggling multiple tools."
            </blockquote>
            
            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-xl font-bold text-blue-700">
                AM
              </div>
              <div>
                <p className="font-semibold text-lg text-gray-900">Ayo Martins</p>
                <p className="text-blue-600 text-sm">Campus Event Organizer</p>
                <p className="text-gray-400 text-xs">University Events Team</p>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-6 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}