import { useState } from 'react';
import { StreamingHeader } from '@/components/StreamingHeader';
import { HeroSection } from '@/components/HeroSection';
import { VideoLibrary } from '@/components/VideoLibrary';
import { UploadInterface } from '@/components/UploadInterface';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'library':
        return <VideoLibrary />;
      case 'upload':
        return <UploadInterface />;
      default:
        return (
          <>
            <HeroSection />
            <VideoLibrary />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StreamingHeader 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className="pt-16">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
