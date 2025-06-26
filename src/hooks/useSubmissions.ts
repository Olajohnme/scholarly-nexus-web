
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Submission } from '@/types/admin';

export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const { toast } = useToast();

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

  const handleEditSubmission = async (submissionId: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({
          status: updates.status,
          volume: updates.volume ? parseInt(updates.volume) : null,
          issue: updates.issue ? parseInt(updates.issue) : null,
          doi: updates.doi || null,
          pages: updates.pages || null,
          admin_notes: updates.admin_notes || null,
          reviewer_comments: updates.reviewer_comments || null
        })
        .eq('id', submissionId);

      if (error) throw error;

      fetchSubmissions();
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

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return {
    submissions,
    fetchSubmissions,
    handleStatusUpdate,
    handleEditSubmission
  };
};
