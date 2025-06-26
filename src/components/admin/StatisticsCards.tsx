
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Submission } from '@/types/admin';

interface StatisticsCardsProps {
  submissions: Submission[];
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ submissions }) => {
  const submissionsByStatus = {
    submitted: submissions.filter(s => s.status === 'submitted'),
    under_review: submissions.filter(s => s.status === 'under_review'),
    revision_requested: submissions.filter(s => s.status === 'revision_requested'),
    accepted: submissions.filter(s => s.status === 'accepted'),
    rejected: submissions.filter(s => s.status === 'rejected')
  };

  return (
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
  );
};
