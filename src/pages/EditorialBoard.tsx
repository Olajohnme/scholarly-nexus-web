import React from 'react';
import { User, Mail, Award, Globe } from 'lucide-react';

const EditorialBoard = () => {
  const editors = [
    {
      name: "Prof. Olakulehin O.A.",
      role: "Editor-in-Chief",
      affiliation: "LAUTECH Teaching Hospital, Ogbomoso",
      image: "/lovable-uploads/c8246d13-1d7e-4539-b463-ea92541c9566.png",
      bio: "Leading expert in clinical medicine with extensive experience in medical education and research supervision. Prof. Olakulehin has been instrumental in advancing medical practice and education in Nigeria.",
      specialization: "Internal Medicine, Medical Education"
    },
    {
      name: "Prof. Akintunde A.A.",
      role: "Deputy Editor-in-Chief",
      affiliation: "LAUTECH Teaching Hospital, Ogbomoso",
      image: "/lovable-uploads/cd9f9e13-ac7b-4d26-8f01-627709e5c417.png",
      bio: "Renowned cardiologist and researcher with numerous publications in cardiovascular medicine. Prof. Akintunde is a leading authority on hypertension and heart disease management in Africa.",
      specialization: "Cardiology, Hypertension Research"
    },
    {
      name: "Mr. Obatunwase S.M.",
      role: "Secretary",
      affiliation: "LAUTECH Teaching Hospital, Ogbomoso",
      image: "/lovable-uploads/087381d0-ae7c-444b-a249-999b44682748.png",
      bio: "Experienced healthcare administrator and academic with expertise in medical publications and editorial management. Mr. Obatunwase ensures the smooth operation of the journal's editorial processes.",
      specialization: "Healthcare Administration, Editorial Management"
    },
    {
      name: "Dr. Akinbola A.I.",
      role: "Editorial Board Member",
      affiliation: "LAUTECH Teaching Hospital, Ogbomoso",
      bio: "Specialist in pediatric medicine with research interests in child health and development. Dr. Akinbola contributes expertise in maternal and child health research.",
      specialization: "Pediatrics, Child Health"
    },
    {
      name: "Dr. Abodunrin O.L.",
      role: "Editorial Board Member",
      affiliation: "LAUTECH Teaching Hospital, Ogbomoso",
      bio: "Public health specialist with focus on community health and preventive medicine. Dr. Abodunrin brings valuable insights on population health research.",
      specialization: "Public Health, Preventive Medicine"
    },
    {
      name: "Mr. Abiola O.J.",
      role: "Editorial Board Member",
      affiliation: "LAUTECH Teaching Hospital, Ogbomoso",
      bio: "Healthcare management professional with expertise in health systems and quality improvement initiatives.",
      specialization: "Healthcare Management, Quality Assurance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            Leadership Team
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Editorial Board</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our distinguished editorial team comprises leading medical professionals and researchers 
            from LAUTECH Teaching Hospital, Ogbomoso, ensuring the highest standards of 
            scientific rigor and clinical excellence in medical publishing.
          </p>
        </div>

        {/* Leadership Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">Journal Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {editors.slice(0, 3).map((editor, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up stagger-${index + 1}`}>
                <div className="p-8 text-center">
                  {/* Profile Image */}
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 border-4 border-primary/20">
                    {editor.image ? (
                      <img 
                        src={editor.image} 
                        alt={editor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
                        <User className="w-16 h-16 text-secondary" />
                      </div>
                    )}
                  </div>

                  {/* Editor Info */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{editor.name}</h3>
                    <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                      <Award className="w-4 h-4 mr-1" />
                      {editor.role}
                    </div>
                    <p className="text-muted-foreground text-sm">{editor.affiliation}</p>
                    {editor.specialization && (
                      <p className="text-secondary text-sm font-medium mt-2">{editor.specialization}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <p className="text-foreground/80 text-sm leading-relaxed mb-6">{editor.bio}</p>

                  {/* Contact */}
                  <div className="flex justify-center">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Board Members */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">Editorial Board Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editors.slice(3).map((editor, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-md border border-border p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-${index + 1}`}>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{editor.name}</h3>
                    <p className="text-primary text-sm font-medium mb-2">{editor.role}</p>
                    <p className="text-muted-foreground text-xs mb-2">{editor.affiliation}</p>
                    {editor.specialization && (
                      <p className="text-secondary text-xs font-medium mb-3">{editor.specialization}</p>
                    )}
                    <p className="text-foreground/70 text-sm line-clamp-3">{editor.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Board Members List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-border mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">Complete Editorial Board</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Core Editorial Team</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Award className="w-4 h-4 mr-2 text-primary" />Prof. Olakulehin O.A. - Editor-in-Chief</li>
                <li className="flex items-center"><Award className="w-4 h-4 mr-2 text-secondary" />Prof. Akintunde A.A. - Deputy Editor-in-Chief</li>
                <li className="flex items-center"><User className="w-4 h-4 mr-2 text-muted-foreground" />Mr. Obatunwase S.M. - Secretary</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Board Members</h4>
              <ul className="space-y-2 text-sm">
                <li>Dr. Akinbola A.I.</li>
                <li>Mr. Abiola O.J.</li>
                <li>Dr. Abodunrin O.L.</li>
                <li>Mrs. Ukpai B.O.</li>
                <li>Pharm. Iyanda S.O.</li>
                <li>Mr. Adelakun A.A.</li>
                <li>Mrs. Ogundipe O.</li>
                <li>Mr. Olaniyan O.A.</li>
                <li>Mr. Akande O.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Join Editorial Team Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Join Our Editorial Mission</h2>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            We welcome qualified medical professionals and researchers to contribute to our peer review process 
            and help advance medical knowledge through scholarly publishing.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Contact Editorial Office
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorialBoard;
