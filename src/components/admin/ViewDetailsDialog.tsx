
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download } from 'lucide-react';
import { Submission } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface ViewDetailsDialogProps {
  submission: Submission | null;
  open: boolean;
  onClose: () => void;
}

export const ViewDetailsDialog: React.FC<ViewDetailsDialogProps> = ({
  submission,
  open,
  onClose
}) => {
  const { toast } = useToast();

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

  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
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

          {submission.manuscript_file_name && (
            <div>
              <Label className="text-sm font-medium">Manuscript File</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">{submission.manuscript_file_name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadManuscript(submission)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          )}

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
  );
};
