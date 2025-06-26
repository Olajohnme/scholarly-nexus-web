
-- First, drop the existing problematic policy on admin_users
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;

-- Create a security definer function to safely check admin status
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT role FROM public.admin_users WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Create a new policy that doesn't cause recursion
CREATE POLICY "Users can view their own admin record" ON public.admin_users
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Allow admins to view all admin records using the security definer function
CREATE POLICY "Admins can view all admin records" ON public.admin_users
    FOR SELECT TO authenticated
    USING (public.get_current_user_role() = 'admin');

-- Update the submissions policies to use the security definer function
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.submissions;

CREATE POLICY "Admins can view all submissions" ON public.submissions
    FOR SELECT TO authenticated
    USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can update submissions" ON public.submissions
    FOR UPDATE TO authenticated
    USING (public.get_current_user_role() = 'admin')
    WITH CHECK (public.get_current_user_role() = 'admin');

-- Update the published_articles policy
DROP POLICY IF EXISTS "Admins can manage published articles" ON public.published_articles;

CREATE POLICY "Admins can manage published articles" ON public.published_articles
    FOR ALL TO authenticated
    USING (public.get_current_user_role() = 'admin')
    WITH CHECK (public.get_current_user_role() = 'admin');
