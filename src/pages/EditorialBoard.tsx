
import React from 'react';
import { User } from 'lucide-react';

const EditorialBoard = () => {
  const editors = [
    {
      name: "Dr. Sarah Johnson",
      role: "Editor-in-Chief",
      affiliation: "Harvard Medical School",
      orcid: "0000-0000-0000-0001",
      bio: "Leading researcher in molecular oncology with over 20 years of experience in cancer research and therapy development.",
      image: "/placeholder.svg"
    },
    {
      name: "Prof. Michael Chen",
      role: "Associate Editor",
      affiliation: "Stanford University",
      orcid: "0000-0000-0000-0002",
      bio: "Expert in genetic engineering and CRISPR technologies with extensive publication record in molecular biology.",
      image: "/placeholder.svg"
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Associate Editor",
      affiliation: "University of Cambridge",
      orcid: "0000-0000-0000-0003",
      bio: "Specialized in infectious diseases and antimicrobial resistance research with focus on tuberculosis treatment.",
      image: "/placeholder.svg"
    },
    {
      name: "Prof. David Thompson",
      role: "Section Editor - Clinical Medicine",
      affiliation: "Johns Hopkins University",
      orcid: "0000-0000-0000-0004",
      bio: "Clinical researcher with expertise in cardiovascular medicine and translational research methodologies.",
      image: "/placeholder.svg"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Section Editor - Molecular Biology",
      affiliation: "MIT",
      orcid: "0000-0000-0000-0005",
      bio: "Molecular biologist focusing on protein structure and function with expertise in drug discovery.",
      image: "/placeholder.svg"
    },
    {
      name: "Prof. James Wilson",
      role: "Section Editor - Diagnostics",
      affiliation: "University of Oxford",
      orcid: "0000-0000-0000-0006",
      bio: "Pioneer in diagnostic technology development and point-of-care testing for global health applications.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Editorial Board</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our distinguished editorial team comprises leading researchers and clinicians 
            from prestigious institutions worldwide, ensuring the highest standards of 
            scientific rigor and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editors.map((editor, index) => (
            <div key={index} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                {/* Profile Image */}
                <div className="w-24 h-24 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-secondary-foreground" />
                </div>

                {/* Editor Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{editor.name}</h3>
                  <p className="text-primary font-medium mb-2">{editor.role}</p>
                  <p className="text-muted-foreground text-sm">{editor.affiliation}</p>
                </div>

                {/* Bio */}
                <p className="text-foreground/80 text-sm mb-4 line-clamp-4">{editor.bio}</p>

                {/* ORCID */}
                <div className="flex items-center justify-center">
                  <a
                    href={`https://orcid.org/${editor.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
                  >
                    ORCID: {editor.orcid}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-card rounded-lg p-8 border border-border text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Join Our Editorial Team</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We are always looking for qualified researchers and clinicians to join our editorial board. 
            If you are interested in contributing to the peer review process and helping advance 
            medical and molecular sciences, we would love to hear from you.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Contact Editorial Office
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorialBoard;
