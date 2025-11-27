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

      // Number of frames (more frames = smoother animation)
      const frames = 40;
      const delay = 80; // ms per frame (slower animation)
      const pauseDelay = 300; // shorter pause between loops

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

      // Helper function to draw frame
      const drawFrame = (position: number) => {
        // Clear canvas with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 600);

        // Draw after image (full)
        ctx.drawImage(afterImg, offsetX, offsetY, drawWidth, drawHeight);

        // Clip and draw before image (reversed: starts at 1, ends at 0)
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

        // Add labels in the corners with strong shadow (always visible)
        ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'left';
        
        // Strong shadow for better visibility
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Before label - bottom left corner
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Before', offsetX + 20, offsetY + drawHeight - 20);
        
        // After label - bottom right corner
        ctx.textAlign = 'right';
        ctx.fillText('After', offsetX + drawWidth - 20, offsetY + drawHeight - 20);
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      };

      // Start with Before image fully visible (position = 1)
      // Add pause frames at the start
      for (let i = 0; i < 5; i++) {
        drawFrame(1); // Full Before image
        gif.addFrame(canvas, { copy: true, delay: pauseDelay });
        setProgress(10 + Math.round((i / (frames + 10)) * 80));
      }

      // Animate from Before to After (position goes from 1 to 0)
      for (let i = 0; i <= frames; i++) {
        const position = 1 - (i / frames); // Start at 1 (full Before), end at 0 (full After)
        drawFrame(position);
        gif.addFrame(canvas, { copy: true, delay });
        setProgress(10 + Math.round(((i + 5) / (frames + 10)) * 80));
      }

      // Add pause frames at the end
      for (let i = 0; i < 5; i++) {
        drawFrame(0); // Full After image
        gif.addFrame(canvas, { copy: true, delay: pauseDelay });
        setProgress(10 + Math.round(((frames + 5 + i) / (frames + 10)) * 80));
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

