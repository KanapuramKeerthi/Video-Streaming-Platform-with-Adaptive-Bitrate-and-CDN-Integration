import { VideoCard } from './VideoCard';
import { VideoPlayer } from './VideoPlayer';
import { useState } from 'react';
import videoThumbnail from '@/assets/video-thumbnail.jpg';

export const VideoLibrary = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const sampleVideos = [
    {
      id: '1',
      title: 'Introduction to Adaptive Streaming',
      thumbnail: videoThumbnail,
      duration: '12:34',
      views: '1.2M views',
      category: 'Tutorial',
      description: 'Learn how adaptive bitrate streaming optimizes video delivery across different network conditions.'
    },
    {
      id: '2',
      title: 'CDN Architecture Deep Dive',
      thumbnail: videoThumbnail,
      duration: '18:45',
      views: '890K views',
      category: 'Technical',
      description: 'Explore the architecture behind content delivery networks and their role in video streaming.'
    },
    {
      id: '3',
      title: 'FFmpeg Transcoding Guide',
      thumbnail: videoThumbnail,
      duration: '25:12',
      views: '2.3M views',
      category: 'Guide',
      description: 'Complete guide to video transcoding using FFmpeg for optimal streaming performance.'
    },
    {
      id: '4',
      title: 'HLS vs DASH Comparison',
      thumbnail: videoThumbnail,
      duration: '15:30',
      views: '654K views',
      category: 'Analysis',
      description: 'Detailed comparison between HTTP Live Streaming and Dynamic Adaptive Streaming protocols.'
    },
    {
      id: '5',
      title: 'Real-time Streaming Setup',
      thumbnail: videoThumbnail,
      duration: '22:18',
      views: '1.8M views',
      category: 'Live',
      description: 'Step-by-step setup for real-time video streaming with low latency configuration.'
    },
    {
      id: '6',
      title: 'Video Quality Optimization',
      thumbnail: videoThumbnail,
      duration: '14:56',
      views: '978K views',
      category: 'Optimization',
      description: 'Techniques for optimizing video quality while maintaining efficient bandwidth usage.'
    }
  ];

  if (selectedVideo) {
    return (
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Now Playing</h2>
            <button 
              onClick={() => setSelectedVideo(null)}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              ← Back to Library
            </button>
          </div>
          
          <VideoPlayer
            src={`/api/video/${selectedVideo}`}
            title="Sample Video"
            poster={videoThumbnail}
          />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              {sampleVideos.find(v => v.id === selectedVideo)?.title}
            </h3>
            <p className="text-muted-foreground">
              {sampleVideos.find(v => v.id === selectedVideo)?.description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold">Video Library</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of high-quality streaming content with adaptive bitrate delivery
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleVideos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            duration={video.duration}
            views={video.views}
            category={video.category}
            description={video.description}
            onClick={() => setSelectedVideo(video.id)}
          />
        ))}
      </div>
    </section>
  );
};