
import React, { useState } from 'react';
import { Search, Calendar, Grid2x2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Archives = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const articles = [
    {
      id: 1,
      title: "Novel Biomarkers in Early Cancer Detection: A Comprehensive Review",
      authors: "Smith, J.A., Johnson, M.B., Williams, K.C.",
      year: "2024",
      volume: "12",
      issue: "3",
      pages: "45-62",
      subject: "Oncology",
      abstract: "Recent advances in molecular biology have opened new avenues for early cancer detection through novel biomarkers...",
      doi: "10.1234/ijmms.2024.001"
    },
    {
      id: 2,
      title: "CRISPR-Cas9 Applications in Rare Genetic Disorders",
      authors: "Chen, L., Rodriguez, A.M., Thompson, R.K.",
      year: "2024",
      volume: "12",
      issue: "2",
      pages: "23-38",
      subject: "Molecular Biology",
      abstract: "Gene editing technologies, particularly CRISPR-Cas9, have shown remarkable potential in treating rare genetic disorders...",
      doi: "10.1234/ijmms.2024.002"
    },
    {
      id: 3,
      title: "Molecular Mechanisms of Drug Resistance in Tuberculosis",
      authors: "Patel, S.R., Kumar, V., Anderson, D.J.",
      year: "2024",
      volume: "12",
      issue: "1",
      pages: "1-18",
      subject: "Microbiology",
      abstract: "Understanding the molecular basis of drug resistance in Mycobacterium tuberculosis is crucial...",
      doi: "10.1234/ijmms.2024.003"
    },
    {
      id: 4,
      title: "Advances in Personalized Medicine for Cardiovascular Disease",
      authors: "Brown, A.L., Davis, M.K., Miller, J.P.",
      year: "2023",
      volume: "11",
      issue: "12",
      pages: "234-251",
      subject: "Cardiology",
      abstract: "Personalized medicine approaches are revolutionizing cardiovascular disease treatment and prevention...",
      doi: "10.1234/ijmms.2023.045"
    },
    {
      id: 5,
      title: "Nanotechnology in Drug Delivery Systems",
      authors: "Lee, S.Y., Park, H.J., Kim, D.S.",
      year: "2023",
      volume: "11",
      issue: "11",
      pages: "198-215",
      subject: "Pharmacology",
      abstract: "Nanotechnology-based drug delivery systems offer promising solutions for targeted therapy...",
      doi: "10.1234/ijmms.2023.044"
    }
  ];

  const years = ["2024", "2023", "2022", "2021", "2020"];
  const subjects = ["Oncology", "Molecular Biology", "Microbiology", "Cardiology", "Pharmacology", "Diagnostics"];

  // Group articles by volume and issue
  const groupedByVolume = articles.reduce((acc, article) => {
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
  }, {} as Record<string, Record<string, typeof articles>>);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !selectedYear || article.year === selectedYear;
    const matchesSubject = !selectedSubject || article.subject === selectedSubject;
    
    return matchesSearch && matchesYear && matchesSubject;
  });

  // Group filtered articles by volume and issue
  const filteredGroupedByVolume = filteredArticles.reduce((acc, article) => {
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
  }, {} as Record<string, Record<string, typeof articles>>);

  const volumes = Object.keys(filteredGroupedByVolume).sort((a, b) => {
    const volA = parseInt(a.split(' ')[1]);
    const volB = parseInt(b.split(' ')[1]);
    return volB - volA; // Sort in descending order (newest first)
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Archives</h1>
          <p className="text-xl text-muted-foreground">
            Explore our complete collection of published research articles organized by Volume and Issue
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

            {/* Subject Filter */}
            <div className="relative">
              <Grid2x2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-background"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">All Subjects</option>
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
            Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} across {volumes.length} volume{volumes.length !== 1 ? 's' : ''}
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
                                    {article.subject}
                                  </span>
                                  <span className="text-muted-foreground text-sm">
                                    Vol. {article.volume}, Issue {article.issue} ({article.year})
                                  </span>
                                </div>
                                
                                <h4 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                                  {article.title}
                                </h4>
                                
                                <p className="text-muted-foreground mb-3 text-sm">{article.authors}</p>
                                
                                <p className="text-foreground/80 mb-4 line-clamp-2 text-sm">{article.abstract}</p>
                                
                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                  <span>Pages: {article.pages}</span>
                                  <span>DOI: {article.doi}</span>
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
          /* No Results */
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
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
    </div>
  );
};

export default Archives;
