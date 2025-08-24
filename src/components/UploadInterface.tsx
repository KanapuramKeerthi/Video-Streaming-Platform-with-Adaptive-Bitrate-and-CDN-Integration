import { useState, useRef } from 'react';
import { Upload, Video, FileText, Settings, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export const UploadInterface = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold">Upload Content</h2>
        <p className="text-xl text-muted-foreground">
          Upload your videos for adaptive bitrate processing and CDN distribution
        </p>
      </div>

      <Card className="gradient-card border-border/50 p-8 space-y-8">
        {/* File Upload Area */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Video File</Label>
          
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
              isDragging 
                ? 'border-primary bg-primary/10' 
                : selectedFile 
                  ? 'border-green-500 bg-green-500/10' 
                  : 'border-border hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              {selectedFile ? (
                <div className="flex items-center justify-center space-x-4">
                  <Video className="w-12 h-12 text-green-500" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetUpload}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-semibold">Drop your video here</p>
                    <p className="text-muted-foreground">or click to browse files</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supports MP4, MOV, AVI, and other video formats
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading and processing...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {/* Metadata Form */}
        {selectedFile && !isUploading && uploadProgress < 100 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter video title" 
                  className="bg-upload-zone border-border"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="bg-upload-zone border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="analysis">Analysis</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Enter video description"
                  className="bg-upload-zone border-border h-24"
                />
              </div>
            </div>
          </div>
        )}

        {/* Processing Settings */}
        {selectedFile && !isUploading && uploadProgress < 100 && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold">Processing Settings</Label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Quality Preset</Label>
                <Select defaultValue="auto">
                  <SelectTrigger className="bg-upload-zone border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (Recommended)</SelectItem>
                    <SelectItem value="high">High Quality</SelectItem>
                    <SelectItem value="medium">Medium Quality</SelectItem>
                    <SelectItem value="low">Low Bandwidth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Adaptive Bitrate</Label>
                <Select defaultValue="enabled">
                  <SelectTrigger className="bg-upload-zone border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Enabled</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>CDN Distribution</Label>
                <Select defaultValue="global">
                  <SelectTrigger className="bg-upload-zone border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global CDN</SelectItem>
                    <SelectItem value="regional">Regional Only</SelectItem>
                    <SelectItem value="local">Local Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Upload Complete */}
        {uploadProgress === 100 && (
          <div className="text-center space-y-4 p-8 rounded-lg bg-green-500/10 border border-green-500/20">
            <Check className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold text-green-500">Upload Complete!</h3>
            <p className="text-muted-foreground">
              Your video has been processed and is now available for streaming
            </p>
            <Button onClick={resetUpload} className="gradient-primary">
              Upload Another Video
            </Button>
          </div>
        )}

        {/* Upload Button */}
        {selectedFile && !isUploading && uploadProgress < 100 && (
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={resetUpload}>
              Cancel
            </Button>
            <Button onClick={simulateUpload} className="gradient-primary">
              <Upload className="w-4 h-4 mr-2" />
              Start Upload & Processing
            </Button>
          </div>
        )}
      </Card>
    </section>
  );
};