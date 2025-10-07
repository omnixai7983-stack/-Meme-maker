// app/page.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { Upload, Download, Share2, Sparkles, Image, Type, Zap, Trophy, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import toast, { Toaster } from 'react-hot-toast';
import AdSense from './components/AdSense';
import MemeEditor from './components/MemeEditor';
import ViralStats from './components/ViralStats';

const memeTemplates = [
  { id: 'drake', name: 'Drake', url: '/templates/drake.jpg', viralScore: 95 },
  { id: 'doge', name: 'Doge', url: '/templates/doge.jpg', viralScore: 88 },
  { id: 'distracted', name: 'Distracted BF', url: '/templates/distracted.jpg', viralScore: 92 },
  { id: 'button', name: 'Button Meme', url: '/templates/button.jpg', viralScore: 85 },
  { id: 'patrick', name: 'Patrick Star', url: '/templates/patrick.jpg', viralScore: 78 },
  { id: 'spongebob', name: 'Spongebob', url: '/templates/spongebob.jpg', viralScore: 82 },
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viralScore, setViralScore] = useState(0);
  const [memesCreated, setMemesCreated] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize with some random stats
    setMemesCreated(12478);
    setViralScore(76);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image too large! Please choose image under 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setCaption('');
        calculateViralScore();
        toast.success('Image loaded! Ready for AI magic! ✨');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedImage(template.url);
    setCaption('');
    setViralScore(template.viralScore);
    setShowTemplates(false);
    toast.success(`Selected ${template.name} template!`);
  };

  const calculateViralScore = () => {
    const score = Math.floor(Math.random() * 30) + 70; // 70-100
    setViralScore(score);
  };

  const generateCaption = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first!');
      return;
    }
    
    setIsGenerating(true);
    
    // Show loading animation
    toast.loading('AI is brewing some comedy... ☕', { id: 'caption-gen' });

    try {
      // Simulate AI thinking with progressive delays
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const funnyCaptions = [
        "When you finally understand the assignment at 11:58 PM 🕛",
        "My brain trying to remember why I walked into this room 🧠",
        "Me vs. Me trying to be productive on a Monday 😴",
        "When the WiFi connects automatically at your crush's house 📶",
        "My bank account after I get paid vs. 2 days later 💸",
        "Trying to explain memes to my parents be like 👴",
        "When you hear someone opening chips in the other room 🏃",
        "My confidence level: 100% in shower, 0% in real life 🚿",
        "When the teacher says 'find a partner' and you make eye contact with nobody 👀",
        "My sleep schedule during weekends vs weekdays 🛌",
        "When you're the last one to know the gossip 😶",
        "My phone at 1% vs me looking for charger 📱",
        "When you try to be cool in front of your crush 😎",
        "My diet starts tomorrow... probably 🍕",
        "When someone says 'I don't like memes' 😱"
      ];
      
      const randomCaption = funnyCaptions[Math.floor(Math.random() * funnyCaptions.length)];
      
      // Simulate typing effect
      let currentCaption = '';
      for (let i = 0; i < randomCaption.length; i++) {
        currentCaption += randomCaption[i];
        setCaption(currentCaption);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      toast.success('AI comedy delivered! 🎭', { id: 'caption-gen' });
      setMemesCreated(prev => prev + 1);
      
      // Celebrate if viral score is high
      if (viralScore > 85) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success('🔥 Viral potential detected! This could blow up!');
      }
      
    } catch (error) {
      toast.error('AI is taking a coffee break ☕ Try again!', { id: 'caption-gen' });
    } finally {
      setIsGenerating(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-400 rounded-full opacity-25 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <Toaster position="top-right" />

      {/* Header Ad */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <AdSense adUnitId="HEADER_AD_UNIT_ID" slot="header-ad" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🤖 AI MEME 
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              FACTORY
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Upload any image → AI writes hilarious captions → <span className="text-yellow-300">GO VIRAL! 🚀</span>
          </motion.p>

          {/* Viral Stats */}
          <ViralStats memesCreated={memesCreated} viralScore={viralScore} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar - Creation Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-white/20"
          >
            <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
              <Zap className="text-orange-500" />
              Create Your Meme
            </h2>
            
            {/* Upload Card */}
            <motion.div 
              className="mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div 
                onClick={triggerFileInput}
                className="cursor-pointer bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-2xl text-center border-4 border-dashed border-white/30 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 group"
              >
                <Upload size={32} className="mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-lg">Upload Your Image</p>
                <p className="text-blue-100 text-sm mt-1">or drop it here!</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </motion.div>

            {/* Templates Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-bold text-gray-700">
                  Popular Templates
                </label>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {showTemplates ? 'Hide' : 'Show All'}
                </button>
              </div>
              
              <div className={`grid gap-2 transition-all duration-300 ${showTemplates ? 'grid-cols-2' : 'grid-cols-2'}`}>
                {memeTemplates.slice(0, showTemplates ? memeTemplates.length : 4).map((template) => (
                  <motion.button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden hover:ring-4 ring-orange-400 transition-all group"
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                      <Image size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1 text-xs font-bold">
                      {template.name}
                    </div>
                    <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded-full">
                      {template.viralScore}%
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={generateCaption}
              disabled={!selectedImage || isGenerating}
              whileHover={{ scale: !selectedImage || isGenerating ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              <Sparkles size={24} className={isGenerating ? 'animate-spin' : ''} />
              {isGenerating ? 'AI Thinking...' : 'Generate Funny Caption'}
            </motion.button>

            {/* Viral Score Indicator */}
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl border-2 border-orange-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Viral Potential:
                  </span>
                  <span className="font-black text-2xl text-orange-600">{viralScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-yellow-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${viralScore}%` }}
                  ></div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Main Content - Meme Editor */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-white/20"
            >
              <MemeEditor
                image={selectedImage}
                caption={caption}
                onCaptionChange={setCaption}
              />
              
              {/* Below Meme Ad */}
              <div className="mt-8">
                <AdSense adUnitId="BELOW_MEME_AD_UNIT_ID" slot="below-meme-ad" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto"
        >
          {[
            { icon: '🤖', title: 'AI-Powered', desc: 'Advanced AI generates hilarious captions automatically' },
            { icon: '🚀', title: 'Go Viral', desc: 'High viral potential scoring system' },
            { icon: '💸', title: 'Earn Money', desc: 'Monetize your viral memes with AdSense' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center border-2 border-white/20"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-black text-xl text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer Ad */}
      <footer className="relative z-10 bg-white/90 backdrop-blur-sm border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <AdSense adUnitId="FOOTER_AD_UNIT_ID" slot="footer-ad" />
          <div className="text-center text-gray-600 mt-4">
            <p className="font-semibold">© 2024 AI Meme Factory - Create viral memes with AI magic! 🎭</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
