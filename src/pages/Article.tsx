
import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, User, FileText } from 'lucide-react';

const Article = () => {
  const { id } = useParams();

  // Mock article data - in a real app, this would be fetched from a database
  const article = {
    id: id,
    title: "Novel Biomarkers in Early Cancer Detection: A Comprehensive Review",
    authors: [
      { name: "Dr. Jennifer A. Smith", affiliation: "Harvard Medical School", orcid: "0000-0000-0000-0001" },
      { name: "Dr. Michael B. Johnson", affiliation: "Mayo Clinic", orcid: "0000-0000-0000-0002" },
      { name: "Dr. Karen C. Williams", affiliation: "Stanford University", orcid: "0000-0000-0000-0003" }
    ],
    journal: "International Journal of Medical and Molecular Sciences",
    volume: "12",
    issue: "3",
    pages: "45-62",
    year: "2024",
    doi: "10.1234/ijmms.2024.001",
    received: "2024-01-15",
    accepted: "2024-02-28",
    published: "2024-03-15",
    abstract: `Background: Early detection of cancer remains one of the most critical challenges in oncology. Recent advances in molecular biology and biotechnology have led to the identification of novel biomarkers that could revolutionize cancer screening and diagnosis.

Objective: This comprehensive review aims to evaluate the current state of novel biomarkers in early cancer detection, their clinical applications, and potential for improving patient outcomes.

Methods: We conducted a systematic review of literature published between 2020-2024, focusing on emerging biomarkers including circulating tumor cells (CTCs), cell-free DNA (cfDNA), exosomes, and protein biomarkers. We analyzed their sensitivity, specificity, and clinical utility across different cancer types.

Results: Our analysis revealed significant advances in liquid biopsy technologies, with ctDNA showing particular promise for early detection of solid tumors. Exosome-based biomarkers demonstrated high specificity for certain cancer types, while multi-biomarker panels showed improved diagnostic accuracy compared to single biomarkers.

Conclusions: Novel biomarkers represent a paradigm shift in cancer detection, offering the potential for earlier diagnosis, improved treatment outcomes, and reduced healthcare costs. However, standardization and validation remain critical challenges for clinical implementation.`,
    keywords: ["Biomarkers", "Cancer Detection", "Liquid Biopsy", "ctDNA", "Exosomes", "Early Diagnosis"],
    references: [
      "Smith JA, et al. Circulating tumor DNA in early cancer detection. Nature Medicine. 2023;29(4):123-135.",
      "Johnson MB, Williams KC. Exosome biomarkers in oncology. Cell. 2023;186(8):1745-1758.",
      "Chen L, et al. Multi-biomarker panels for cancer screening. The Lancet Oncology. 2024;25(2):234-247."
    ]
  };

  const citationFormats = {
    apa: `${article.authors.map(a => a.name.split(' ').pop() + ', ' + a.name.split(' ')[1][0] + '.').join(', ')} (${article.year}). ${article.title}. ${article.journal}, ${article.volume}(${article.issue}), ${article.pages}. https://doi.org/${article.doi}`,
    mla: `${article.authors[0].name.split(' ').pop()}, ${article.authors[0].name.split(' ')[1]}${article.authors.length > 1 ? ', et al.' : ''}. "${article.title}." ${article.journal}, vol. ${article.volume}, no. ${article.issue}, ${article.year}, pp. ${article.pages}.`,
    chicago: `${article.authors.map(a => a.name).join(', ')}. "${article.title}." ${article.journal} ${article.volume}, no. ${article.issue} (${article.year}): ${article.pages}.`
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          
          {/* Authors */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground mb-2">Authors</h2>
            <div className="space-y-2">
              {article.authors.map((author, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{author.name}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{author.affiliation}</span>
                  <a 
                    href={`https://orcid.org/${author.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    ORCID: {author.orcid}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Publication Info */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Published:</span>
                  <span className="text-foreground">{article.published}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Journal:</span>
                  <span className="text-foreground ml-2">{article.journal}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="text-foreground ml-2">{article.volume}({article.issue})</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">Pages:</span>
                  <span className="text-foreground ml-2">{article.pages}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">DOI:</span>
                  <a href={`https://doi.org/${article.doi}`} className="text-primary hover:text-primary/80 ml-2">
                    {article.doi}
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground">Received:</span>
                  <span className="text-foreground ml-2">{article.received}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button className="border border-border text-foreground px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors">
              Save Article
            </button>
            <button className="border border-border text-foreground px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors">
              Share
            </button>
          </div>
        </header>

        {/* Abstract */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Abstract</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="prose prose-gray max-w-none">
              {article.abstract.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground/80 mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Keywords */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((keyword, index) => (
              <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {keyword}
              </span>
            ))}
          </div>
        </section>

        {/* Citation */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">How to Cite</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">APA Format</h3>
              <p className="text-foreground/80 text-sm font-mono bg-secondary/20 p-3 rounded">
                {citationFormats.apa}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">MLA Format</h3>
              <p className="text-foreground/80 text-sm font-mono bg-secondary/20 p-3 rounded">
                {citationFormats.mla}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Chicago Format</h3>
              <p className="text-foreground/80 text-sm font-mono bg-secondary/20 p-3 rounded">
                {citationFormats.chicago}
              </p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                CRISPR-Cas9 Applications in Rare Genetic Disorders
              </h3>
              <p className="text-muted-foreground text-sm mb-2">Chen, L., Rodriguez, A.M., Thompson, R.K.</p>
              <p className="text-foreground/80 text-sm">Gene editing technologies show promise in treating rare genetic disorders...</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                Molecular Mechanisms of Drug Resistance in Tuberculosis
              </h3>
              <p className="text-muted-foreground text-sm mb-2">Patel, S.R., Kumar, V., Anderson, D.J.</p>
              <p className="text-foreground/80 text-sm">Understanding molecular basis of drug resistance is crucial for new therapeutics...</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Article;
