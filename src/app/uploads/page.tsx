"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Download,
  Trash2,
  ArrowLeft,
  BookOpen,
  Eye
} from "lucide-react";
import Link from "next/link";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  subject?: string;
  status: 'uploading' | 'processing' | 'processed' | 'error';
  progress: number;
  uploadedAt: Date;
  processedAt?: Date;
  error?: string;
}

export default function UploadsPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [uploads, setUploads] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Calculus Chapter 3.pdf',
      size: 2048576,
      type: 'application/pdf',
      subject: 'Mathematics',
      status: 'processed',
      progress: 100,
      uploadedAt: new Date('2024-01-10'),
      processedAt: new Date('2024-01-10')
    },
    {
      id: '2',
      name: 'Physics Lab Notes.docx',
      size: 1048576,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      subject: 'Physics',
      status: 'processing',
      progress: 65,
      uploadedAt: new Date('2024-01-12')
    },
    {
      id: '3',
      name: 'Chemistry Textbook.pdf',
      size: 5242880,
      type: 'application/pdf',
      subject: 'Chemistry',
      status: 'error',
      progress: 0,
      uploadedAt: new Date('2024-01-13'),
      error: 'File too large. Maximum size is 5MB.'
    }
  ]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/auth/sign-in");
      return;
    }
  }, [isLoaded, isSignedIn, router]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const newUpload: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        uploadedAt: new Date()
      };

      setUploads(prev => [newUpload, ...prev]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploads(prev => prev.map(upload => {
          if (upload.id === newUpload.id) {
            const newProgress = Math.min(upload.progress + 10, 100);
            const newStatus = newProgress === 100 ? 'processing' : 'uploading';
            return { ...upload, progress: newProgress, status: newStatus };
          }
          return upload;
        }));
      }, 200);

      // Simulate processing completion
      setTimeout(() => {
        setUploads(prev => prev.map(upload => {
          if (upload.id === newUpload.id) {
            return { 
              ...upload, 
              status: 'processed', 
              progress: 100,
              processedAt: new Date(),
              subject: 'Auto-detected'
            };
          }
          return upload;
        }));
        clearInterval(interval);
      }, 3000);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'text/plain': ['.txt']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'processed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Upload className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">My Uploads</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{uploads.length} files</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-lg font-medium text-blue-600">Drop the files here...</p>
              ) : (
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drag & drop files here, or click to select
                  </p>
                  <p className="text-sm text-gray-600">
                    Supports PDF, DOCX, PPTX, and TXT files up to 5MB
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Uploads List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Uploaded Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {uploads.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No documents uploaded yet</p>
                <p className="text-sm text-gray-500">Upload your first document to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {uploads.map((upload) => (
                  <div key={upload.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{upload.name}</h4>
                          <p className="text-sm text-gray-600">
                            {formatFileSize(upload.size)} • {upload.type}
                          </p>
                          {upload.subject && (
                            <Badge variant="outline" className="mt-1">
                              {upload.subject}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(upload.status)}>
                          {getStatusIcon(upload.status)}
                          <span className="ml-1 capitalize">{upload.status}</span>
                        </Badge>
                        <div className="flex space-x-1">
                          {upload.status === 'processed' && (
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {(upload.status === 'uploading' || upload.status === 'processing') && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{upload.progress}%</span>
                        </div>
                        <Progress value={upload.progress} />
                      </div>
                    )}

                    {/* Error Message */}
                    {upload.status === 'error' && upload.error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800">{upload.error}</p>
                      </div>
                    )}

                    {/* Upload Info */}
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Uploaded: {upload.uploadedAt.toLocaleDateString()}</span>
                      {upload.processedAt && (
                        <span>Processed: {upload.processedAt.toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Files</p>
                  <p className="text-2xl font-bold text-gray-900">{uploads.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {uploads.filter(u => u.status === 'processed').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Size</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatFileSize(uploads.reduce((acc, u) => acc + u.size, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
