
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedArticles = () => {
  const articles = [
    {
      id: 1,
      title: "Novel Biomarkers in Early Cancer Detection: A Comprehensive Review",
      authors: "Smith, J.A., Johnson, M.B., Williams, K.C.",
      journal: "IJMMS",
      year: "2024",
      abstract: "Recent advances in molecular biology have opened new avenues for early cancer detection through novel biomarkers...",
      tags: ["Oncology", "Biomarkers", "Diagnostics"],
      featured: true
    },
    {
      id: 2,
      title: "CRISPR-Cas9 Applications in Rare Genetic Disorders",
      authors: "Chen, L., Rodriguez, A.M., Thompson, R.K.",
      journal: "IJMMS",
      year: "2024",
      abstract: "Gene editing technologies, particularly CRISPR-Cas9, have shown remarkable potential in treating rare genetic disorders...",
      tags: ["Gene Editing", "CRISPR", "Rare Diseases"],
      featured: true
    },
    {
      id: 3,
      title: "Molecular Mechanisms of Drug Resistance in Tuberculosis",
      authors: "Patel, S.R., Kumar, V., Anderson, D.J.",
      journal: "IJMMS",
      year: "2024",
      abstract: "Understanding the molecular basis of drug resistance in Mycobacterium tuberculosis is crucial for developing new therapeutic strategies...",
      tags: ["Tuberculosis", "Drug Resistance", "Microbiology"],
      featured: true
    }
  ];

  return (
    <section className="py-16 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Articles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest groundbreaking research in medical and molecular sciences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.map((tag) => (
                    <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-3">
                  <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-muted-foreground text-sm mb-3">
                  {article.authors}
                </p>
                
                <p className="text-foreground/80 text-sm mb-4 line-clamp-3">
                  {article.abstract}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {article.journal} • {article.year}
                  </span>
                  <Link
                    to={`/article/${article.id}`}
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/archives"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
