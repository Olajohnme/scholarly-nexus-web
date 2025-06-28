import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Upload, FileText, User, Mail, LogOut } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Submit = () => {
  const { user, profile, loading, signOut } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    manuscript: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Show message if profile is incomplete
  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Profile Setup Required</h1>
          <p className="text-muted-foreground mb-4">
            Please complete your profile setup before submitting articles.
          </p>
          <Link to="/auth">
            <Button>Complete Profile</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, manuscript: file }));
  };

  const uploadManuscriptFile = async (file: File, submissionId: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${submissionId}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('manuscripts')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('manuscripts')
        .getPublicUrl(filePath);

      return {
        fileName: file.name,
        fileUrl: publicUrl
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert submission with user_id
      const { data: submission, error: insertError } = await supabase
        .from('submissions')
        .insert({
          title: formData.title,
          abstract: formData.abstract,
          keywords: formData.keywords,
          authors: `${profile.last_name}, ${profile.first_name}${profile.middle_name_initial ? ' ' + profile.middle_name_initial : ''}`,
          email: profile.email,
          affiliation: profile.affiliated_institution,
          status: 'submitted',
          user_id: user.id
        })
        .select()
        .single();

      if (insertError) throw insertError;

      let manuscriptFileName = null;
      let manuscriptFileUrl = null;

      // If there's a manuscript file, upload it
      if (formData.manuscript && submission) {
        const uploadResult = await uploadManuscriptFile(formData.manuscript as File, submission.id);
        manuscriptFileName = uploadResult.fileName;
        manuscriptFileUrl = uploadResult.fileUrl;

        // Update the submission with file information
        const { error: updateError } = await supabase
          .from('submissions')
          .update({
            manuscript_file_name: manuscriptFileName,
            manuscript_file_url: manuscriptFileUrl
          })
          .eq('id', submission.id);

        if (updateError) throw updateError;
      }

      // Reset form
      setFormData({
        title: '',
        abstract: '',
        keywords: '',
        manuscript: null
      });

      // Reset file input
      const fileInput = document.getElementById('manuscript-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      toast({
        title: "Success!",
        description: "Your manuscript has been submitted successfully. You can track its progress in your dashboard."
      });

    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit manuscript. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Submit Your Research</h1>
            <p className="text-muted-foreground">
              Welcome, {profile.first_name} {profile.last_name} ({profile.affiliated_institution})
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">My Submissions</Button>
            </Link>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Submission Guidelines */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Submission Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Manuscript Requirements</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Original research articles (3,000-8,000 words)</li>
                <li>• Review articles (5,000-12,000 words)</li>
                <li>• Case studies (1,500-3,000 words)</li>
                <li>• Figures and tables with appropriate captions</li>
                <li>• References in Vancouver style</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">File Formats</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>• Manuscript: Word (.docx) or LaTeX (.tex)</li>
                <li>• Figures: TIFF, PNG, or EPS (min 300 DPI)</li>
                <li>• Tables: Excel (.xlsx) or embedded in manuscript</li>
                <li>• Maximum file size: 50 MB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Author Information - Pre-filled */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Author Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Author:</span> {profile.first_name} {profile.middle_name_initial} {profile.last_name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {profile.email}
              </div>
              <div>
                <span className="font-medium">Institution:</span> {profile.affiliated_institution}
              </div>
              <div>
                <span className="font-medium">Qualification:</span> {profile.academic_qualification}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Author information is automatically filled from your profile. To update, please contact support.
            </p>
          </div>

          {/* Manuscript Information */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Manuscript Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your article title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Abstract *
                </label>
                <textarea
                  name="abstract"
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  placeholder="Provide a comprehensive abstract (250-350 words) including background, methods, results, and conclusions"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Keywords *
                </label>
                <input
                  type="text"
                  name="keywords"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="3-6 keywords separated by commas"
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Manuscript Upload
            </h3>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-foreground font-medium">Upload your manuscript</p>
                <p className="text-muted-foreground text-sm">
                  Supported formats: .docx, .tex, .pdf (max 50MB)
                </p>
                <input
                  type="file"
                  name="manuscript"
                  accept=".docx,.tex,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="manuscript-upload"
                />
                <label
                  htmlFor="manuscript-upload"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Choose File
                </label>
                {formData.manuscript && (
                  <p className="text-sm text-foreground mt-2">
                    Selected: {(formData.manuscript as File).name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-5 h-5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Manuscript'}</span>
            </button>
          </div>
        </form>

        {/* Next Steps */}
        <div className="mt-12 bg-card rounded-lg border border-border p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-semibold">
                1
              </div>
              <h4 className="font-medium text-foreground mb-2">Initial Review</h4>
              <p className="text-muted-foreground text-sm">
                Editorial team reviews submission for scope and format compliance (2-3 days)
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-semibold">
                2
              </div>
              <h4 className="font-medium text-foreground mb-2">Peer Review</h4>
              <p className="text-muted-foreground text-sm">
                Double-blind peer review by subject matter experts (4-8 weeks)
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-semibold">
                3
              </div>
              <h4 className="font-medium text-foreground mb-2">Decision</h4>
              <p className="text-muted-foreground text-sm">
                Editorial decision and author notification with reviewer comments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
