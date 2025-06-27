
-- Drop the existing restrictive policy that requires authentication
DROP POLICY IF EXISTS "Anyone can submit articles" ON public.submissions;

-- Create a new policy that allows anonymous users to insert submissions
CREATE POLICY "Allow anonymous submissions" ON public.submissions
FOR INSERT 
WITH CHECK (true);

-- Keep the existing admin policies for viewing and updating submissions
-- These should already exist and work correctly for authenticated admins
