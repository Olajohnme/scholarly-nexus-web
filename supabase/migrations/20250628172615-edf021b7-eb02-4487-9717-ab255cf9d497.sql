
-- Create user profiles table with all required fields
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    middle_name_initial TEXT,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT,
    affiliated_institution TEXT NOT NULL,
    academic_qualification TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own profile
CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can insert their own profile (for registration)
CREATE POLICY "Users can insert their own profile" ON public.user_profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Update submissions table to link to authenticated users
ALTER TABLE public.submissions ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Update the submission policy to require authentication
DROP POLICY IF EXISTS "Enable anonymous article submissions" ON public.submissions;

-- Only authenticated users can submit articles
CREATE POLICY "Authenticated users can submit articles" ON public.submissions
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Users can view their own submissions
CREATE POLICY "Users can view their own submissions" ON public.submissions
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id OR public.get_current_user_role() = 'admin');

-- Create trigger to automatically create user profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.user_profiles (user_id, first_name, middle_name_initial, last_name, email, phone_number, affiliated_institution, academic_qualification)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'middle_name_initial', NULL),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'phone_number', NULL),
        COALESCE(NEW.raw_user_meta_data->>'affiliated_institution', ''),
        COALESCE(NEW.raw_user_meta_data->>'academic_qualification', '')
    );
    RETURN NEW;
END;
$$;

-- Trigger to execute the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
