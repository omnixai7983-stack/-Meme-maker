// components/AdSense.tsx
'use client';
import { useEffect } from 'react';

interface AdSenseProps {
  adUnitId: string;
  slot: string;
}

export default function AdSense({ adUnitId, slot }: AdSenseProps) {
  useEffect(() => {
    // Load AdSense script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Initialize ad
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={adUnitId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
