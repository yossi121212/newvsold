'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

interface GifExporterProps {
  beforeImage: string;
  afterImage: string;
}

export default function GifExporter({ beforeImage, afterImage }: GifExporterProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  const createGif = async () => {
    setIsExporting(true);
    setProgress(0);

    try {
      // Dynamically import GIF.js only when needed
      const GIF = (await import('gif.js')).default;

      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: 800,
        height: 600,
        workerScript: '/gif.worker.js',
      });

      // Pre-load images
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      setProgress(5);
      const beforeImg = await loadImage(beforeImage);
      const afterImg = await loadImage(afterImage);
      setProgress(10);

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Number of frames
      const frames = 30;
      const delay = 100; // ms per frame

      // Calculate aspect-fit dimensions
      const imgAspect = beforeImg.width / beforeImg.height;
      const canvasAspect = 800 / 600;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) {
        drawWidth = 800;
        drawHeight = 800 / imgAspect;
        offsetX = 0;
        offsetY = (600 - drawHeight) / 2;
      } else {
        drawHeight = 600;
        drawWidth = 600 * imgAspect;
        offsetX = (800 - drawWidth) / 2;
        offsetY = 0;
      }

      // Create frames by animating the slider position
      for (let i = 0; i <= frames; i++) {
        const position = (i / frames); // 0 to 1
        
        // Clear canvas with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 600);

        // Draw after image (full)
        ctx.drawImage(afterImg, offsetX, offsetY, drawWidth, drawHeight);

        // Clip and draw before image
        ctx.save();
        ctx.beginPath();
        ctx.rect(offsetX, offsetY, drawWidth * position, drawHeight);
        ctx.clip();
        ctx.drawImage(beforeImg, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();

        // Draw slider line
        const sliderX = offsetX + (drawWidth * position);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(sliderX, offsetY);
        ctx.lineTo(sliderX, offsetY + drawHeight);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Add frame to GIF
        gif.addFrame(canvas, { copy: true, delay });
        
        setProgress(10 + Math.round((i / frames) * 80));
      }

      // Render GIF
      gif.on('finished', (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'comparison.gif';
        link.click();
        URL.revokeObjectURL(url);
        setIsExporting(false);
        setProgress(0);
      });

      setProgress(95);
      gif.render();
    } catch (error) {
      console.error('Error creating GIF:', error);
      alert('Error creating GIF. Please try again.');
      setIsExporting(false);
      setProgress(0);
    }
  };

  return (
    <>
      <button
        onClick={createGif}
        disabled={isExporting}
        className={`
          flex items-center gap-2 px-4 py-2 font-medium rounded-lg border transition-all duration-200
          ${
            isExporting
              ? 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-400 dark:text-gray-600 border-gray-200 dark:border-[#3a3a3a] cursor-not-allowed'
              : 'bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#3a3a3a] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-[#3a3a3a]'
          }
        `}
      >
        {isExporting ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Creating GIF... {progress}%
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export as GIF
          </>
        )}
      </button>

      <div ref={canvasRef} className="hidden"></div>
    </>
  );
}

