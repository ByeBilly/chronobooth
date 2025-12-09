import React, { useRef, useState, useEffect, useCallback } from 'react';

interface CameraProps {
  onCapture: (base64Image: string) => void;
}

export const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        // Flip horizontally for a mirror effect if using front camera usually
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(dataUrl);
      }
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl border-2 border-chrono-panel">
      {error ? (
        <div className="flex items-center justify-center h-full text-red-400 p-4 text-center">
          {error}
        </div>
      ) : (
        <>
          <video 
            ref={videoRef} 
            className="w-full h-full object-cover transform -scale-x-100" // Mirror the preview
            playsInline 
            muted 
          />
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
            <button 
              onClick={capturePhoto}
              className="bg-white rounded-full p-2 border-4 border-chrono-accent shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:scale-105 transition-transform active:scale-95 group"
            >
              <div className="w-12 h-12 bg-red-500 rounded-full group-hover:bg-red-600 transition-colors"></div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
