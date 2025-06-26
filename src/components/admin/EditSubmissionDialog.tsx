
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Submission, EditFormState } from '@/types/admin';

interface EditSubmissionDialogProps {
  submission: Submission | null;
  open: boolean;
  onClose: () => void;
  editForm: EditFormState;
  setEditForm: (form: EditFormState) => void;
  onSave: () => void;
}

export const EditSubmissionDialog: React.FC<EditSubmissionDialogProps> = ({
  submission,
  open,
  onClose,
  editForm,
  setEditForm,
  onSave
}) => {
  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
