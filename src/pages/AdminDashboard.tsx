
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useSubmissions } from '@/hooks/useSubmissions';
import { StatisticsCards } from '@/components/admin/StatisticsCards';
import { SubmissionsTable } from '@/components/admin/SubmissionsTable';
import { ViewDetailsDialog } from '@/components/admin/ViewDetailsDialog';
import { EditSubmissionDialog } from '@/components/admin/EditSubmissionDialog';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Submission, EditFormState } from '@/types/admin';

const AdminDashboard = () => {
  const { isAdmin, loading } = useAdminAuth();
  const { submissions, handleStatusUpdate, handleEditSubmission } = useSubmissions();
  
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditFormState>({
    status: '',
    volume: '',
    issue: '',
    doi: '',
    pages: '',
    admin_notes: '',
    reviewer_comments: ''
  });

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
    setViewDialogOpen(true);
  };

  const openEditDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    setEditForm({
      status: submission.status,
      volume: submission.volume?.toString() || '',
      issue: submission.issue?.toString() || '',
      doi: submission.doi || '',
      pages: submission.pages || '',
      admin_notes: submission.admin_notes || '',
      reviewer_comments: submission.reviewer_comments || ''
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedSubmission) return;
    
    await handleEditSubmission(selectedSubmission.id, editForm);
    setEditDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              You don't have permission to access the admin dashboard.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminHeader />

        <StatisticsCards submissions={submissions} />

        <Card>
          <CardHeader>
            <CardTitle>Article Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <SubmissionsTable
              submissions={submissions}
              onViewDetails={handleViewDetails}
              onEditSubmission={openEditDialog}
              onStatusUpdate={handleStatusUpdate}
            />
          </CardContent>
        </Card>

        <ViewDetailsDialog
          submission={selectedSubmission}
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
        />

        <EditSubmissionDialog
          submission={selectedSubmission}
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
