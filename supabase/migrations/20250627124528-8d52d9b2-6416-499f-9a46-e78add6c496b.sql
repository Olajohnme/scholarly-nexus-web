
-- Create the manuscripts storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('manuscripts', 'manuscripts', true);

-- Create policy to allow anyone to upload manuscripts
CREATE POLICY "Allow manuscript uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'manuscripts');

-- Create policy to allow admins to download manuscripts
CREATE POLICY "Allow manuscript downloads" ON storage.objects
FOR SELECT USING (bucket_id = 'manuscripts');
