declare module 'gif.js' {
  interface GIFOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    workerScript?: string;
    background?: string;
    transparent?: string | null;
  }

  interface GIFFrame {
    delay?: number;
    copy?: boolean;
  }

  class GIF {
    constructor(options?: GIFOptions);
    addFrame(image: HTMLImageElement | HTMLCanvasElement | CanvasRenderingContext2D | ImageData, options?: GIFFrame): void;
    on(event: string, callback: (blob: Blob) => void): void;
    render(): void;
    abort(): void;
  }

  export default GIF;
}

