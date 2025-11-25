'use client';

import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
}

export default function ComparisonSlider({
  beforeImage,
  afterImage,
  alt = 'Image comparison',
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full">
      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl cursor-col-resize"
        style={{ aspectRatio: '16/9', minHeight: '500px' }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onClick={handleClick}
      >
        {/* After Image (Full) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={afterImage}
            alt={`${alt} - After`}
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
          {/* After Label - Bottom Right Inside */}
          <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs font-semibold rounded-full backdrop-blur-sm">
            AFTER
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={`${alt} - Before`}
            className="max-w-full max-h-full object-contain"
            draggable={false}
            style={{ 
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          {/* Before Label - Bottom Left Inside */}
          <div 
            className="absolute bottom-6 left-6 px-4 py-2 bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs font-semibold rounded-full backdrop-blur-sm"
            style={{ 
              position: 'absolute',
              left: '24px',
              bottom: '24px'
            }}
          >
            BEFORE
          </div>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.4)]"
          style={{ left: `${sliderPosition}%`, zIndex: 10 }}
        >
          {/* Center Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing border-2 border-gray-200 hover:scale-105 transition-transform">
            <div className="flex gap-1">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
