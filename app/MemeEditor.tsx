// components/MemeEditor.tsx
'use client';
import { useRef, useState, useEffect } from 'react';
import { Download, Share2, Palette, Type, Move } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface MemeEditorProps {
  image: string | null;
  caption: string;
  onCaptionChange: (caption: string) => void;
}

export default function MemeEditor({ image, caption, onCaptionChange }: MemeEditorProps) {
  const [fontSize, setFontSize] = useState(36);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 85 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = [
    '#FFFFFF', '#FFD93D', '#FF6B35', '#9B5DE5', '#00D4FF', 
    '#F15BB5', '#00BB2D', '#FF0000', '#000000'
  ];

  const downloadMeme = async () => {
    if (!canvasRef.current || !image) {
      toast.error('No meme to download!');
      return;
    }
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        // Set canvas size
        const maxWidth = 1200;
        const ratio = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Draw caption with stroke
        ctx.font = `bold ${fontSize * ratio}px Impact, Arial, sans-serif`;
        ctx.textAlign = 'center';
        
        // Text positioning
        const x = (textPosition.x / 100) * canvas.width;
        const y = (textPosition.y / 100) * canvas.height;
        
        // Stroke
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(3 * ratio, 2);
        ctx.strokeText(caption, x, y);
        
        // Fill
        ctx.fillStyle = textColor;
        ctx.fillText(caption, x, y);
        
        // Trigger download
        const link = document.createElement('a');
        link.download = `ai-meme-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 0.9);
        link.click();
        
        // Celebration!
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        toast.success('Meme downloaded! Share it far and wide! 🚀');
      };
      img.src = image;
    } catch (error) {
      toast.error('Failed to download meme. Try again!');
    }
  };

  const shareMeme = async () => {
    if (!canvasRef.current) {
      toast.error('No meme to share!');
      return;
    }
    
    try {
      // Convert canvas to blob
      canvasRef.current.toBlob(async (blob) => {
        if (blob && navigator.share) {
          const file = new File([blob], 'ai-meme.png', { type: 'image/png' });
          
          await navigator.share({
            files: [file],
            title: 'Check out this AI-generated meme!',
            text: 'I created this hilarious meme using AI Meme Factory! 🤖',
          });
          toast.success('Shared successfully! 🎉');
        } else {
          // Fallback: copy image to clipboard
          canvasRef.current?.toBlob((blob) => {
            if (blob) {
              const item = new ClipboardItem({ 'image/png': blob });
              navigator.clipboard.write([item]);
              toast.success('Meme copied to clipboard! 📋');
            }
          });
        }
      });
    } catch (error) {
      toast.error('Sharing failed. Try downloading instead!');
    }
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTextPosition({
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y))
    });
  };

  if (!image) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border-4 border-dashed border-gray-300"
      >
        <div className="text-center text-gray-500 p-8">
          <motion.div 
            className="text-8xl mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🖼️
          </motion.div>
          <p className="text-xl font-semibold mb-2">No Image Selected</p>
          <p className="text-gray-400">Upload an image or choose a template to start creating!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Meme Preview with Drag */}
      <div 
        ref={containerRef}
        className="relative aspect-video bg-black rounded-2xl overflow-hidden cursor-move group"
        onMouseMove={handleDrag}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <img
          src={image}
          alt="Meme background"
          className="w-full h-full object-contain"
        />
        
        {caption && (
          <motion.div
            className="absolute select-none cursor-move"
            style={{
              left: `${textPosition.x}%`,
              top: `${textPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${fontSize}px`,
              color: textColor,
              fontFamily: 'Impact, sans-serif',
              textShadow: `
                ${strokeColor} 2px 2px 0,
                ${strokeColor} -2px -2px 0,
                ${strokeColor} 2px -2px 0,
                ${strokeColor} -2px 2px 0
              `,
            }}
            whileHover={{ scale: 1.05 }}
            drag
            dragConstraints={containerRef}
            dragElastic={0}
            onDrag={(_, info) => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              const x = ((info.point.x - rect.left) / rect.width) * 100;
              const y = ((info.point.y - rect.top) / rect.height) * 100;
              
              setTextPosition({
                x: Math.max(5, Math.min(95, x)),
                y: Math.max(5, Math.min(95, y))
              });
            }}
          >
            {caption}
          </motion.div>
        )}
        
        {/* Drag Instructions */}
        {caption && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            <Move size={14} />
            Drag text to reposition
          </div>
        )}
        
        {/* Hidden canvas for download */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Editor Controls */}
      {caption && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 space-y-6 border-2 border-purple-100"
        >
          <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
            <Palette className="text-purple-500" />
            Customize Your Meme
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Type size={16} />
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="16"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Text Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setTextColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      textColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                    } transition-transform`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Stroke Color */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Stroke Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setStrokeColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      strokeColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                    } transition-transform`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={downloadMeme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                <Download size={20} />
                Download
              </motion.button>
              
              <motion.button
                onClick={shareMeme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <Share2 size={20} />
                Share
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Custom CSS for slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #FF6B35;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #FF6B35;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
