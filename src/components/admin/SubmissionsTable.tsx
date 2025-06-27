
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Edit, Download } from 'lucide-react';
import { Submission } from '@/types/admin';

interface SubmissionsTableProps {
  submissions: Submission[];
  onViewDetails: (submission: Submission) => void;
  onEditSubmission: (submission: Submission) => void;
  onStatusUpdate: (submissionId: string, newStatus: string) => void;
}

export const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  onViewDetails,
  onEditSubmission,
  onStatusUpdate
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'revision_requested':
        return 'bg-orange-100 text-orange-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (submission: Submission) => {
    if (submission.manuscript_file_url) {
      const link = document.createElement('a');
      link.href = submission.manuscript_file_url;
      link.download = submission.manuscript_file_name || `manuscript-${submission.id}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted Date</TableHead>
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
              <TableCell>{submission.email}</TableCell>
              <TableCell>
                <Select
                  value={submission.status}
                  onValueChange={(value) => onStatusUpdate(submission.id, value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue>
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status.replace('_', ' ')}
                      </Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="revision_requested">Revision Requested</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {new Date(submission.submitted_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {submission.manuscript_file_url ? (
                  <Button
                    onClick={() => handleDownload(submission)}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </Button>
                ) : (
                  <span className="text-muted-foreground text-sm">No file</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => onViewDetails(submission)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => onEditSubmission(submission)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {submissions.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No submissions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
