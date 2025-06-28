
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigate, Link } from 'react-router-dom';
import { FileText, Calendar, User, LogOut, Plus } from 'lucide-react';
import { Submission } from '@/types/admin';

const Dashboard = () => {
  const { user, profile, loading, signOut } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const { toast } = useToast();

  // Redirect if not authenticated
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const fetchUserSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to load your submissions.",
        variant: "destructive"
      });
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserSubmissions();
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'revision_required':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.first_name} {profile?.last_name}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/submit">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Submission
              </Button>
            </Link>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Name:</span>
                <p>{profile?.first_name} {profile?.middle_name_initial} {profile?.last_name}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Email:</span>
                <p>{profile?.email}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Institution:</span>
                <p>{profile?.affiliated_institution}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Qualification:</span>
                <p>{profile?.academic_qualification}</p>
              </div>
              {profile?.phone_number && (
                <div>
                  <span className="font-medium text-muted-foreground">Phone:</span>
                  <p>{profile.phone_number}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              My Submissions ({submissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSubmissions ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading submissions...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No submissions yet</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't submitted any articles yet. Ready to share your research?
                </p>
                <Link to="/submit">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Your First Article
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {submissions.map((submission) => (
                  <div key={submission.id} className="border border-border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {submission.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Submitted: {formatDate(submission.submitted_at)}
                          </div>
                          {submission.reviewed_at && (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Reviewed: {formatDate(submission.reviewed_at)}
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge className={getStatusColor(submission.status)}>
                        {formatStatus(submission.status)}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {submission.abstract}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Keywords: {submission.keywords}
                      </div>
                      {submission.manuscript_file_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={submission.manuscript_file_url} target="_blank" rel="noopener noreferrer">
                            View File
                          </a>
                        </Button>
                      )}
                    </div>
                    
                    {submission.reviewer_comments && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Reviewer Comments:</h4>
                        <p className="text-sm text-muted-foreground">{submission.reviewer_comments}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
