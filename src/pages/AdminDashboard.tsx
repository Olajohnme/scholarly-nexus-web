
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Eye, Edit, Check, X, Download, Calendar, User, Mail } from 'lucide-react';
import { format } from 'date-fns';

interface Submission {
  id: string;
  title: string;
  authors: string;
  email: string;
  affiliation: string;
  abstract: string;
  keywords: string;
  status: string;
  volume?: number;
  issue?: number;
  doi?: string;
  pages?: string;
  submitted_at: string;
  reviewed_at?: string;
  published_at?: string;
  admin_notes?: string;
  reviewer_comments?: string;
  manuscript_file_name?: string;
  manuscript_file_url?: string;
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form states for editing
  const [editForm, setEditForm] = useState({
    status: '',
    volume: '',
    issue: '',
    doi: '',
    pages: '',
    admin_notes: '',
    reviewer_comments: ''
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Access Denied",
          description: "Please log in to access the admin dashboard.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (adminData) {
        setIsAdmin(true);
        fetchSubmissions();
      } else {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      toast({
        title: "Error",
        description: "Failed to verify admin status.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch submissions.",
        variant: "destructive"
      });
    }
  };

  const handleStatusUpdate = async (submissionId: string, newStatus: string) => {
    try {
      const updates: any = {
        status: newStatus,
        reviewed_at: new Date().toISOString()
      };

      if (newStatus === 'accepted') {
        updates.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('submissions')
        .update(updates)
        .eq('id', submissionId);

      if (error) throw error;

      // If accepted, also create published article
      if (newStatus === 'accepted') {
        const submission = submissions.find(s => s.id === submissionId);
        if (submission && submission.volume && submission.issue && submission.doi) {
          await createPublishedArticle(submission);
        }
      }

      fetchSubmissions();
      toast({
        title: "Success",
        description: `Article ${newStatus} successfully.`
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update article status.",
        variant: "destructive"
      });
    }
  };

  const createPublishedArticle = async (submission: Submission) => {
    try {
      const { error } = await supabase
        .from('published_articles')
        .insert({
          submission_id: submission.id,
          title: submission.title,
          authors: submission.authors,
          abstract: submission.abstract,
          keywords: submission.keywords,
          volume: submission.volume,
          issue: submission.issue,
          pages: submission.pages,
          year: new Date().getFullYear(),
          doi: submission.doi,
          subject: 'Medical Sciences' // Default subject
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error creating published article:', error);
      throw error;
    }
  };

  const handleEditSubmission = async () => {
    if (!selectedSubmission) return;

    try {
      const { error } = await supabase
        .from('submissions')
        .update({
          status: editForm.status,
          volume: editForm.volume ? parseInt(editForm.volume) : null,
          issue: editForm.issue ? parseInt(editForm.issue) : null,
          doi: editForm.doi || null,
          pages: editForm.pages || null,
          admin_notes: editForm.admin_notes || null,
          reviewer_comments: editForm.reviewer_comments || null
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      fetchSubmissions();
      setEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Submission updated successfully."
      });
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Error",
        description: "Failed to update submission.",
        variant: "destructive"
      });
    }
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      submitted: { label: 'Submitted', variant: 'secondary' as const },
      under_review: { label: 'Under Review', variant: 'default' as const },
      revision_requested: { label: 'Revision Requested', variant: 'outline' as const },
      accepted: { label: 'Accepted', variant: 'default' as const },
      rejected: { label: 'Rejected', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.submitted;
    return <Badge variant={config.variant}>{config.label}</Badge>;
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

  const submissionsByStatus = {
    submitted: submissions.filter(s => s.status === 'submitted'),
    under_review: submissions.filter(s => s.status === 'under_review'),
    revision_requested: submissions.filter(s => s.status === 'revision_requested'),
    accepted: submissions.filter(s => s.status === 'accepted'),
    rejected: submissions.filter(s => s.status === 'rejected')
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage article submissions and publications</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{submissionsByStatus.submitted.length}</div>
              <div className="text-sm text-muted-foreground">New Submissions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{submissionsByStatus.under_review.length}</div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{submissionsByStatus.revision_requested.length}</div>
              <div className="text-sm text-muted-foreground">Revisions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{submissionsByStatus.accepted.length}</div>
              <div className="text-sm text-muted-foreground">Accepted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{submissionsByStatus.rejected.length}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Article Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Authors</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Volume/Issue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium max-w-xs truncate">
                        {submission.title}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {submission.authors}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(submission.status)}
                      </TableCell>
                      <TableCell>
                        {format(new Date(submission.submitted_at), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        {submission.volume && submission.issue 
                          ? `Vol ${submission.volume}, Issue ${submission.issue}`
                          : '-'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Article Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-semibold text-lg">{submission.title}</h3>
                                  <p className="text-muted-foreground">by {submission.authors}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Email</Label>
                                    <p className="text-sm">{submission.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Affiliation</Label>
                                    <p className="text-sm">{submission.affiliation}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Abstract</Label>
                                  <p className="text-sm mt-1">{submission.abstract}</p>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Keywords</Label>
                                  <p className="text-sm mt-1">{submission.keywords}</p>
                                </div>

                                {submission.admin_notes && (
                                  <div>
                                    <Label className="text-sm font-medium">Admin Notes</Label>
                                    <p className="text-sm mt-1">{submission.admin_notes}</p>
                                  </div>
                                )}

                                {submission.reviewer_comments && (
                                  <div>
                                    <Label className="text-sm font-medium">Reviewer Comments</Label>
                                    <p className="text-sm mt-1">{submission.reviewer_comments}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(submission)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          {submission.status !== 'accepted' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusUpdate(submission.id, 'accepted')}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}

                          {submission.status !== 'rejected' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusUpdate(submission.id, 'rejected')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Submission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={editForm.status} onValueChange={(value) => setEditForm({...editForm, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="revision_requested">Revision Requested</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="doi">DOI</Label>
                  <Input
                    id="doi"
                    value={editForm.doi}
                    onChange={(e) => setEditForm({...editForm, doi: e.target.value})}
                    placeholder="10.xxxx/journal.xxxx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="volume">Volume</Label>
                  <Input
                    id="volume"
                    type="number"
                    value={editForm.volume}
                    onChange={(e) => setEditForm({...editForm, volume: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="issue">Issue</Label>
                  <Input
                    id="issue"
                    type="number"
                    value={editForm.issue}
                    onChange={(e) => setEditForm({...editForm, issue: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    value={editForm.pages}
                    onChange={(e) => setEditForm({...editForm, pages: e.target.value})}
                    placeholder="1-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  value={editForm.admin_notes}
                  onChange={(e) => setEditForm({...editForm, admin_notes: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="reviewer_comments">Reviewer Comments</Label>
                <Textarea
                  id="reviewer_comments"
                  value={editForm.reviewer_comments}
                  onChange={(e) => setEditForm({...editForm, reviewer_comments: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditSubmission}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
