import { Play, Upload, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-streaming.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Video Streaming Platform"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Stream
            <span className="gradient-accent bg-clip-text text-transparent"> Anywhere</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience adaptive bitrate streaming with lightning-fast CDN delivery. 
            Upload, process, and stream videos with professional quality.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="gradient-primary hover:shadow-glow transition-smooth px-8 py-6 text-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Streaming
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg transition-smooth"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Content
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-card shadow-card">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Adaptive Bitrate</h3>
            <p className="text-muted-foreground">
              Automatic quality adjustment for optimal viewing experience
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-card shadow-card">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">FFmpeg Processing</h3>
            <p className="text-muted-foreground">
              Professional video transcoding and optimization
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-card shadow-card">
              <Play className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">CDN Delivery</h3>
            <p className="text-muted-foreground">
              Global content delivery with minimal latency
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};