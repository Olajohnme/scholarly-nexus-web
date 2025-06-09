
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, FileText, ArrowRight } from 'lucide-react';

const FeaturedArticles = () => {
  const articles = [
    {
      id: 1,
      title: "A Review of Severe Cases of Coronavirus Disease 2019: a Matter for the Heart",
      authors: "Dr. Adebayo, M.K., Prof. Oluwaseun, T.A., Dr. Bamidele, R.O.",
      journal: "IJMMS",
      year: "2024",
      volume: "Volume 12, Issue 3",
      abstract: "Recent advances in understanding the cardiovascular implications of COVID-19 have revealed significant patterns in severe cases. This comprehensive review examines the cardiac manifestations and long-term implications for patient care...",
      tags: ["Cardiology", "COVID-19", "Clinical Medicine"],
      featured: true,
      pageRef: "Page 03"
    },
    {
      id: 2,
      title: "Overcoming the Challenges of Orthopaedic Practice in Nigeria",
      authors: "Dr. Ogundipe, A.S., Prof. Akintunde, B.L., Dr. Fashina, O.K.",
      journal: "IJMMS",
      year: "2024",
      volume: "Volume 12, Issue 3",
      abstract: "Orthopaedic practice in developing countries faces unique challenges. This study examines the current state of orthopaedic care in Nigeria and proposes evidence-based solutions for improving patient outcomes...",
      tags: ["Orthopaedics", "Healthcare Systems", "Nigeria"],
      featured: true,
      pageRef: "Page 21"
    },
    {
      id: 3,
      title: "Acute Urinary Retention in a Nigerian Woman: a Rare Urological Emergency",
      authors: "Dr. Oladele, F.M., Dr. Adeyemi, K.O., Prof. Gbadamosi, S.T.",
      journal: "IJMMS",
      year: "2024",
      volume: "Volume 12, Issue 3",
      abstract: "Acute urinary retention in women is uncommon but represents a urological emergency requiring immediate intervention. This case report discusses the diagnostic approach and management strategies...",
      tags: ["Urology", "Emergency Medicine", "Case Report"],
      featured: true,
      pageRef: "Page 13"
    }
  ];

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
          {articles.map((article, index) => (
            <article 
              key={article.id} 
              className={`bg-white rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="p-8">
                {/* Tags and Page Reference */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {article.pageRef}
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
                    <span>{article.volume} • {article.year}</span>
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
          ))}
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
