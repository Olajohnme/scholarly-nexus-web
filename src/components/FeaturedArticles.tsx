
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, FileText, ArrowRight } from 'lucide-react';
import { usePublishedArticles } from '@/hooks/usePublishedArticles';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedArticles = () => {
  const { articles, loading } = usePublishedArticles(3); // Limit to 3 most recent articles

  const formatTags = (keywords: string, subject?: string) => {
    const keywordArray = keywords.split(',').map(k => k.trim()).slice(0, 2);
    if (subject && !keywordArray.includes(subject)) {
      keywordArray.unshift(subject);
    }
    return keywordArray.slice(0, 2);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4 mr-2" />
              Latest Research
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Featured Publications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the latest groundbreaking research and clinical insights from leading medical professionals 
              and researchers in our current issue.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="w-4 h-4 mr-2" />
            Latest Research
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured Publications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the latest groundbreaking research and clinical insights from leading medical professionals 
            and researchers in our current issue.
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article, index) => {
              const tags = formatTags(article.keywords, article.subject);
              return (
                <article 
                  key={article.id} 
                  className={`bg-white rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up stagger-${index + 1}`}
                >
                  <div className="p-8">
                    {/* Tags and Page Reference */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {article.pages}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-4 leading-tight hover:text-primary transition-colors">
                      <Link to={`/article/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>
                    
                    {/* Authors */}
                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-2">{article.authors}</span>
                    </div>
                    
                    {/* Abstract */}
                    <p className="text-foreground/80 text-sm mb-6 line-clamp-4 leading-relaxed">
                      {article.abstract}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Volume {article.volume}, Issue {article.issue} • {article.year}</span>
                      </div>
                      <Link
                        to={`/article/${article.id}`}
                        className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors group"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up stagger-3">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-border max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Explore Our Complete Archive
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access our comprehensive collection of peer-reviewed articles, case studies, 
              and research papers spanning multiple medical disciplines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/archives"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>View All Issues</span>
              </Link>
              <Link
                to="/submit"
                className="border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Submit Research</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
