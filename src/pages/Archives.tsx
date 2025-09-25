
import React, { useState } from 'react';
import { Search, Calendar, Grid2x2, Download, Quote } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Static sample data for archives
const sampleArchiveArticles = [
  {
    id: "1",
    title: "Advances in Cardiac Surgery: A Comprehensive Review of Modern Techniques",
    authors: "Dr. John Smith, Dr. Mary Johnson, Prof. Ahmed Hassan",
    abstract: "This comprehensive review examines the latest advances in cardiac surgical techniques, including minimally invasive procedures, robotic surgery applications, and improved patient outcomes. Our analysis covers data from over 500 procedures performed between 2020-2024.",
    keywords: "Cardiac Surgery, Minimally Invasive, Robotic Surgery",
    volume: 15,
    issue: 2,
    pages: "12-28",
    year: 2024,
    doi: "10.12345/ijmmslth.2024.15.2.001",
    affiliation: "Department of Cardiovascular Surgery, LAUTECH Teaching Hospital",
    manuscript_file_url: null
  },
  {
    id: "2", 
    title: "Novel Approaches to Diabetes Management in Nigerian Healthcare Settings",
    authors: "Dr. Adebayo Olumide, Dr. Fatima Ibrahim, Dr. Grace Okafor",
    abstract: "This study investigates innovative diabetes management strategies tailored for Nigerian healthcare contexts, focusing on community-based interventions and culturally appropriate treatment protocols that have shown significant improvement in patient compliance and outcomes.",
    keywords: "Diabetes, Healthcare Management, Community Health",
    volume: 15,
    issue: 2,
    pages: "45-62",
    year: 2024,
    doi: "10.12345/ijmmslth.2024.15.2.002",
    affiliation: "Department of Endocrinology, LAUTECH Teaching Hospital",
    manuscript_file_url: null
  },
  {
    id: "3",
    title: "Antimicrobial Resistance Patterns in Nigerian Hospitals: A Five-Year Analysis",
    authors: "Prof. Chioma Okwu, Dr. Kabir Mohammed, Dr. Sarah Adeleke",
    abstract: "A comprehensive analysis of antimicrobial resistance patterns observed in major Nigerian hospitals from 2019-2024, highlighting emerging trends, policy implications, and recommended interventions for combating resistant infections.",
    keywords: "Antimicrobial Resistance, Hospital Infections, Public Health",
    volume: 15,
    issue: 1,
    pages: "78-95",
    year: 2024,
    doi: "10.12345/ijmmslth.2024.15.1.001",
    affiliation: "Department of Medical Microbiology, LAUTECH Teaching Hospital",
    manuscript_file_url: null
  },
  {
    id: "4",
    title: "Mental Health Services in Rural Communities: Challenges and Solutions",
    authors: "Dr. Oluwaseun Adeyemi, Dr. Rasheed Afolabi",
    abstract: "An examination of mental health service delivery in rural Nigerian communities, identifying key barriers to access and proposing sustainable intervention strategies based on community engagement and telemedicine approaches.",
    keywords: "Mental Health, Rural Healthcare, Telemedicine",
    volume: 14,
    issue: 3,
    pages: "15-32",
    year: 2023,
    doi: "10.12345/ijmmslth.2023.14.3.001",
    affiliation: "Department of Psychiatry, LAUTECH Teaching Hospital",
    manuscript_file_url: null
  }
];

const Archives = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const articles = sampleArchiveArticles;

  const handleViewPDF = (article: typeof sampleArchiveArticles[0]) => {
    alert("PDF viewing feature will be available with the new Online Journal System integration.");
  };

  const handleCiteArticle = (article: typeof sampleArchiveArticles[0]) => {
    const citation = `${article.authors} (${article.year}). ${article.title}. ${article.affiliation}, Vol. ${article.volume}, Issue ${article.issue}, pp. ${article.pages}. DOI: ${article.doi}.`;
    
    navigator.clipboard.writeText(citation).then(() => {
      alert("Citation copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy citation. Please select and copy manually.");
    });
  };

  // Get unique years from the sample articles
  const years = [...new Set(articles.map(article => article.year.toString()))].sort((a, b) => parseInt(b) - parseInt(a));

  const subjects = [...new Set(articles.map(article => article.affiliation))].sort();

  const articlesWithVolumeIssue = articles;
  
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
  }, {} as Record<string, Record<string, typeof sampleArchiveArticles>>);

  const filteredArticles = articles.filter(article => {
    const articleYear = article.year.toString();
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.keywords.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !selectedYear || articleYear === selectedYear;
    const matchesSubject = !selectedSubject || article.affiliation === selectedSubject;
    
    return matchesSearch && matchesYear && matchesSubject;
  });

  const filteredArticlesWithVolumeIssue = filteredArticles;
  
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
  }, {} as Record<string, Record<string, typeof sampleArchiveArticles>>);

  const volumes = Object.keys(filteredGroupedByVolume).sort((a, b) => {
    const volA = parseInt(a.split(' ')[1]);
    const volB = parseInt(b.split(' ')[1]);
    return volB - volA;
  });

  const articlesWithoutVolumeIssue: typeof sampleArchiveArticles = [];

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
                    return issueB - issueA;
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
                                     Vol. {article.volume}, Issue {article.issue} ({article.year})
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
                                 <Button 
                                   onClick={() => handleViewPDF(article)}
                                   className="text-sm"
                                   disabled={true}
                                 >
                                  <Download className="w-4 h-4 mr-2" />
                                  View PDF
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => handleCiteArticle(article)}
                                  className="text-sm"
                                >
                                  <Quote className="w-4 h-4 mr-2" />
                                  Cite Article
                                </Button>
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
                               Accepted ({article.year})
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
                          <Button 
                            onClick={() => handleViewPDF(article)}
                            className="text-sm"
                            disabled={!article.manuscript_file_url}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            View PDF
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleCiteArticle(article)}
                            className="text-sm"
                          >
                            <Quote className="w-4 h-4 mr-2" />
                            Cite Article
                          </Button>
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
