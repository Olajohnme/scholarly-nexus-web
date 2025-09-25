
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, FileText, ArrowRight } from 'lucide-react';

// Static sample articles for display
const sampleArticles = [
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
    subject: "Cardiology"
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
    subject: "Endocrinology"
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
    subject: "Infectious Diseases"
  }
];

const FeaturedArticles = () => {
  const formatTags = (keywords: string, subject?: string) => {
    const keywordArray = keywords.split(',').map(k => k.trim()).slice(0, 2);
    if (subject && !keywordArray.includes(subject)) {
      keywordArray.unshift(subject);
    }
    return keywordArray.slice(0, 2);
  };


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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {sampleArticles.map((article, index) => {
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
                to="/contact"
                className="border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
