
-- Create submissions table to store article submissions
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    keywords TEXT NOT NULL,
    authors TEXT NOT NULL,
    email TEXT NOT NULL,
    affiliation TEXT NOT NULL,
    manuscript_file_name TEXT,
    manuscript_file_url TEXT,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'revision_requested', 'accepted', 'rejected')),
    volume INTEGER,
    issue INTEGER,
    doi TEXT,
    pages TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    admin_notes TEXT,
    reviewer_comments TEXT
);

-- Create published_articles table for accepted articles that appear in archives
CREATE TABLE public.published_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    abstract TEXT NOT NULL,
    keywords TEXT NOT NULL,
    volume INTEGER NOT NULL,
    issue INTEGER NOT NULL,
    pages TEXT NOT NULL,
    year INTEGER NOT NULL,
    doi TEXT NOT NULL UNIQUE,
    subject TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.published_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for submissions (public can insert, admins can do everything)
CREATE POLICY "Anyone can submit articles" ON public.submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all submissions" ON public.submissions
    FOR SELECT TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can update submissions" ON public.submissions
    FOR UPDATE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Create policies for published_articles (public can read, admins can manage)
CREATE POLICY "Anyone can view published articles" ON public.published_articles
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage published articles" ON public.published_articles
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Create policies for admin_users
CREATE POLICY "Admins can view admin users" ON public.admin_users
    FOR SELECT TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = user_uuid
    );
$$;
