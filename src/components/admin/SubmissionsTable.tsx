
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Check, X, Download } from 'lucide-react';
import { format } from 'date-fns';
import { Submission } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface SubmissionsTableProps {
  submissions: Submission[];
  onViewDetails: (submission: Submission) => void;
  onEditSubmission: (submission: Submission) => void;
  onStatusUpdate: (submissionId: string, status: string) => void;
}

export const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  onViewDetails,
  onEditSubmission,
  onStatusUpdate
}) => {
  const { toast } = useToast();

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

  const handleDownloadManuscript = async (submission: Submission) => {
    if (!submission.manuscript_file_url || !submission.manuscript_file_name) {
      toast({
        title: "Error",
        description: "No manuscript file available for download.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(submission.manuscript_file_url);
      if (!response.ok) {
        throw new Error('Failed to fetch manuscript file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = submission.manuscript_file_name;
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast({
        title: "Success",
        description: "Manuscript downloaded successfully."
      });
    } catch (error) {
      console.error('Error downloading manuscript:', error);
      toast({
        title: "Error",
        description: "Failed to download manuscript file.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Volume/Issue</TableHead>
            <TableHead>Manuscript</TableHead>
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
                {submission.manuscript_file_name ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownloadManuscript(submission)}
                    className="text-blue-600 hover:text-blue-700"
                    title="Download manuscript"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                ) : (
                  <span className="text-muted-foreground text-sm">No file</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => onViewDetails(submission)}>
                    <Eye className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="sm" onClick={() => onEditSubmission(submission)}>
                    <Edit className="w-4 h-4" />
                  </Button>

                  {submission.status !== 'accepted' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onStatusUpdate(submission.id, 'accepted')}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}

                  {submission.status !== 'rejected' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onStatusUpdate(submission.id, 'rejected')}
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
  );
};
