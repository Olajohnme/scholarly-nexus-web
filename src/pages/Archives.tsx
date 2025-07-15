
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Grid2x2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AcceptedSubmission {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  keywords: string;
  volume: number | null;
  issue: number | null;
  pages: string | null;
  doi: string | null;
  submitted_at: string;
  affiliation: string;
}

const Archives = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [articles, setArticles] = useState<AcceptedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAcceptedSubmissions();
  }, []);

  const fetchAcceptedSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('status', 'accepted')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      console.log('Fetched accepted submissions:', data);
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching accepted submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch accepted articles.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique years from the fetched articles
  const years = [...new Set(articles.map(article => {
    const year = new Date(article.submitted_at).getFullYear();
    return year.toString();
  }))].sort((a, b) => parseInt(b) - parseInt(a));

  // For now, we'll use affiliation as subject since there's no subject field in submissions
  const subjects = [...new Set(articles.map(article => article.affiliation).filter(Boolean))].sort();

  // Group articles by volume and issue - only include articles that have both volume and issue
  const articlesWithVolumeIssue = articles.filter(article => article.volume && article.issue);
  
  const groupedByVolume = articlesWithVolumeIssue.reduce((acc, article) => {
    const volumeKey = `Volume ${article.volume}`;
    if (!acc[volumeKey]) {
      acc[volumeKey] = {};
    }
    const issueKey = `Issue ${article.issue}`;
    if (!acc[volumeKey][issueKey]) {
      acc[volumeKey][issueKey] = [];
    }
    acc[volumeKey][issueKey].push(article);
    return acc;
  }, {} as Record<string, Record<string, AcceptedSubmission[]>>);

  const filteredArticles = articles.filter(article => {
    const articleYear = new Date(article.submitted_at).getFullYear().toString();
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.keywords.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !selectedYear || articleYear === selectedYear;
    const matchesSubject = !selectedSubject || article.affiliation === selectedSubject;
    
    return matchesSearch && matchesYear && matchesSubject;
  });

  // Group filtered articles by volume and issue
  const filteredArticlesWithVolumeIssue = filteredArticles.filter(article => article.volume && article.issue);
  
  const filteredGroupedByVolume = filteredArticlesWithVolumeIssue.reduce((acc, article) => {
    const volumeKey = `Volume ${article.volume}`;
    if (!acc[volumeKey]) {
      acc[volumeKey] = {};
    }
    const issueKey = `Issue ${article.issue}`;
    if (!acc[volumeKey][issueKey]) {
      acc[volumeKey][issueKey] = [];
    }
    acc[volumeKey][issueKey].push(article);
    return acc;
  }, {} as Record<string, Record<string, AcceptedSubmission[]>>);

  const volumes = Object.keys(filteredGroupedByVolume).sort((a, b) => {
    const volA = parseInt(a.split(' ')[1]);
    const volB = parseInt(b.split(' ')[1]);
    return volB - volA; // Sort in descending order (newest first)
  });

  // Articles without volume/issue (show separately)
  const articlesWithoutVolumeIssue = filteredArticles.filter(article => !article.volume || !article.issue);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Archives</h1>
          <p className="text-xl text-muted-foreground">
            Explore our complete collection of accepted research articles organized by Volume and Issue
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles, authors, keywords..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-background"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Subject Filter (using affiliation) */}
            <div className="relative">
              <Grid2x2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-background"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">All Affiliations</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredArticles.length} accepted article{filteredArticles.length !== 1 ? 's' : ''} 
            {volumes.length > 0 && ` across ${volumes.length} volume${volumes.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Volume and Issue Organization */}
        {volumes.length > 0 ? (
          <Tabs defaultValue={volumes[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">
              {volumes.map((volume) => (
                <TabsTrigger key={volume} value={volume} className="text-sm">
                  {volume}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {volumes.map((volume) => (
              <TabsContent key={volume} value={volume} className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">{volume}</h2>
                
                {Object.keys(filteredGroupedByVolume[volume])
                  .sort((a, b) => {
                    const issueA = parseInt(a.split(' ')[1]);
                    const issueB = parseInt(b.split(' ')[1]);
                    return issueB - issueA; // Sort issues in descending order
                  })
                  .map((issue) => (
                    <div key={issue} className="mb-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                        {issue}
                      </h3>
                      
                      <div className="space-y-4">
                        {filteredGroupedByVolume[volume][issue].map((article) => (
                          <article key={article.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow duration-200">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                                    {article.affiliation}
                                  </span>
                                  <span className="text-muted-foreground text-sm">
                                    Vol. {article.volume}, Issue {article.issue} ({new Date(article.submitted_at).getFullYear()})
                                  </span>
                                </div>
                                
                                <h4 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                                  {article.title}
                                </h4>
                                
                                <p className="text-muted-foreground mb-3 text-sm">{article.authors}</p>
                                
                                <p className="text-foreground/80 mb-4 line-clamp-2 text-sm">{article.abstract}</p>
                                
                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                  {article.pages && <span>Pages: {article.pages}</span>}
                                  {article.doi && <span>DOI: {article.doi}</span>}
                                  <span>Keywords: {article.keywords}</span>
                                </div>
                              </div>
                              
                              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                                <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-sm font-medium hover:bg-primary/90 transition-colors">
                                  View PDF
                                </button>
                                <button className="border border-border text-foreground px-3 py-1.5 rounded text-sm font-medium hover:bg-secondary transition-colors">
                                  Cite Article
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="space-y-6">
            {/* Show articles without volume/issue if any */}
            {articlesWithoutVolumeIssue.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Accepted Articles (Pending Volume/Issue Assignment)</h2>
                <div className="space-y-4">
                  {articlesWithoutVolumeIssue.map((article) => (
                    <article key={article.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                              {article.affiliation}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              Accepted ({new Date(article.submitted_at).getFullYear()})
                            </span>
                          </div>
                          
                          <h4 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                            {article.title}
                          </h4>
                          
                          <p className="text-muted-foreground mb-3 text-sm">{article.authors}</p>
                          
                          <p className="text-foreground/80 mb-4 line-clamp-2 text-sm">{article.abstract}</p>
                          
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                            {article.pages && <span>Pages: {article.pages}</span>}
                            {article.doi && <span>DOI: {article.doi}</span>}
                            <span>Keywords: {article.keywords}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                          <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-sm font-medium hover:bg-primary/90 transition-colors">
                            View PDF
                          </button>
                          <button className="border border-border text-foreground px-3 py-1.5 rounded text-sm font-medium hover:bg-secondary transition-colors">
                            Cite Article
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
            
            {/* No Results */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No accepted articles found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedYear('');
                    setSelectedSubject('');
                  }}
                  className="mt-4 text-primary hover:text-primary/80 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Archives;
