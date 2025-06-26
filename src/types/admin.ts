
export interface Submission {
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

export interface EditFormState {
  status: string;
  volume: string;
  issue: string;
  doi: string;
  pages: string;
  admin_notes: string;
  reviewer_comments: string;
}
