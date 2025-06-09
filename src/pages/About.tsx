
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About IJMMS</h1>
          <p className="text-xl text-muted-foreground">
            Leading the advancement of medical and molecular sciences through open access publishing
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission Statement */}
          <section className="bg-card rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-foreground/80 leading-relaxed">
              The International Journal of Medical and Molecular Sciences (IJMMS) is committed to advancing 
              scientific knowledge through the publication of high-quality, peer-reviewed research in medical 
              and molecular sciences. We strive to provide an open platform for researchers worldwide to share 
              their discoveries and contribute to the global scientific community.
            </p>
          </section>

          {/* Scope and Aims */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Scope and Aims</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Research Areas</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>• Molecular Biology and Genetics</li>
                  <li>• Biomedical Engineering</li>
                  <li>• Clinical Medicine</li>
                  <li>• Pharmacology and Therapeutics</li>
                  <li>• Diagnostic Technologies</li>
                  <li>• Public Health Research</li>
                </ul>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Publication Types</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>• Original Research Articles</li>
                  <li>• Review Articles</li>
                  <li>• Case Studies</li>
                  <li>• Short Communications</li>
                  <li>• Technical Notes</li>
                  <li>• Editorial Perspectives</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Editorial Policy */}
          <section className="bg-card rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Editorial Policy</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                IJMMS follows a rigorous peer-review process to ensure the highest standards of scientific 
                integrity and quality. All submitted manuscripts undergo double-blind peer review by experts 
                in the relevant field.
              </p>
              <p>
                We are committed to open access publishing, making all research freely available to the global 
                scientific community. This approach accelerates scientific discovery and promotes collaboration 
                across institutions and borders.
              </p>
              <p>
                The journal adheres to the highest ethical standards as outlined by the Committee on Publication 
                Ethics (COPE) and follows best practices for research integrity, data sharing, and conflict of 
                interest disclosure.
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Journal Timeline</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                  2012
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Journal Founded</h3>
                  <p className="text-muted-foreground">IJMMS was established with the vision of creating an open access platform for medical research.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                  2015
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">International Recognition</h3>
                  <p className="text-muted-foreground">The journal gained international recognition and began indexing in major academic databases.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                  2020
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Digital Transformation</h3>
                  <p className="text-muted-foreground">Launched advanced online submission system and enhanced digital publishing capabilities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-secondary text-secondary-foreground rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                  2024
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Integration</h3>
                  <p className="text-muted-foreground">Implemented AI-powered features for enhanced research discovery and manuscript processing.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
