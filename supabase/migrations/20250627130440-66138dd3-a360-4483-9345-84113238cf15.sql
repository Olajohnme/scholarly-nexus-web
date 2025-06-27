
-- First, let's check and drop ALL existing policies on submissions table
DROP POLICY IF EXISTS "Anyone can submit articles" ON public.submissions;
DROP POLICY IF EXISTS "Allow anonymous submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.submissions;

-- Create a comprehensive policy that allows anonymous insertions
CREATE POLICY "Enable anonymous article submissions" ON public.submissions
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Recreate admin policies for viewing and updating
CREATE POLICY "Admins can view all submissions" ON public.submissions
FOR SELECT TO authenticated
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can update submissions" ON public.submissions
FOR UPDATE TO authenticated
USING (public.get_current_user_role() = 'admin')
WITH CHECK (public.get_current_user_role() = 'admin');
