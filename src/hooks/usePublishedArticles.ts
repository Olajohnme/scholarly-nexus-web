
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PublishedArticle {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  keywords: string;
  volume: number;
  issue: number;
  pages: string;
  year: number;
  doi: string;
  subject?: string;
  published_at: string;
}

export const usePublishedArticles = (limit?: number) => {
  const [articles, setArticles] = useState<PublishedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('published_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching published articles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch published articles.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    fetchArticles
  };
};
