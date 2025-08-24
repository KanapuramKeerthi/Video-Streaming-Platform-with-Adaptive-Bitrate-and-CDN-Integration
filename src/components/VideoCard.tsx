import { Play, Clock, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  description?: string;
  onClick?: () => void;
}

export const VideoCard = ({
  title,
  thumbnail,
  duration,
  views,
  category,
  description,
  onClick
}: VideoCardProps) => {
  return (
    <Card 
      className="group cursor-pointer gradient-card border-border/50 overflow-hidden transition-smooth hover:shadow-glow hover:scale-105"
      onClick={onClick}
    >
      <div className="relative video-aspect overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-video-overlay opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
          <div className="bg-primary/90 rounded-full p-3 transition-bounce transform scale-75 group-hover:scale-100">
            <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
          </div>
        </div>
        
        {/* Duration Badge */}
        <Badge 
          variant="secondary" 
          className="absolute bottom-2 right-2 bg-background/80 text-foreground"
        >
          <Clock className="w-3 h-3 mr-1" />
          {duration}
        </Badge>
        
        {/* Category Badge */}
        <Badge 
          className="absolute top-2 left-2 gradient-accent text-accent-foreground"
        >
          {category}
        </Badge>
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex items-center text-xs text-muted-foreground space-x-2">
          <div className="flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            {views}
          </div>
        </div>
      </div>
    </Card>
  );
};