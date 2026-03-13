
import React from 'react';
import { BookOpen, FileText, CheckCircle, AlertCircle, Download, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AuthorGuidelines = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Author Guidelines
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Comprehensive guidelines for manuscript preparation and submission to the 
              Integrated Journal of Medicine and Medical Sciences
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <FileText className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle>Manuscript Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Original Research</li>
                  <li>• Case Reports</li>
                  <li>• Review Articles</li>
                  <li>• Short Communications</li>
                  <li>• Letters to Editor</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle>Review Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Double-blind peer review</li>
                  <li>• 4-6 weeks review time</li>
                  <li>• Editorial decision within 8 weeks</li>
                  <li>• Online publication</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <AlertCircle className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle>Publication Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Domestic: ₦50,000</li>
                  <li>• International: $100 / €70</li>
                  <li>• No hidden charges</li>
                  <li>• Payment after acceptance</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert className="mb-8">
            <Download className="h-4 w-4" />
            <AlertTitle>Download Templates</AlertTitle>
            <AlertDescription>
              We recommend using our manuscript template to ensure proper formatting. 
              Contact us at ijmmslth@yahoo.com to request the latest template.
            </AlertDescription>
          </Alert>

          {/* Detailed Guidelines */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Detailed Submission Guidelines</h2>
            
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="manuscript-preparation">
                <AccordionTrigger className="text-xl font-semibold">
                  Manuscript Preparation
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">General Format</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Use 12-point Times New Roman font</li>
                      <li>• Double-space throughout the manuscript</li>
                      <li>• Use 1-inch margins on all sides</li>
                      <li>• Number pages consecutively</li>
                      <li>• Submit as Microsoft Word (.docx) or PDF</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Manuscript Structure</h4>
                    <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                      <li>Title page with author information</li>
                      <li>Abstract (max 250 words)</li>
                      <li>Keywords (3-6 terms)</li>
                      <li>Introduction</li>
                      <li>Methods/Materials and Methods</li>
                      <li>Results</li>
                      <li>Discussion</li>
                      <li>Conclusion</li>
                      <li>References</li>
                      <li>Figures and Tables (if applicable)</li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="references">
                <AccordionTrigger className="text-xl font-semibold">
                  Reference Style
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Use Vancouver style for references. References should be numbered consecutively 
                    in the order they appear in the text.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Journal Article Example:</h4>
                    <p className="bg-muted p-3 rounded text-sm">
                      1. Smith AB, Johnson CD, Williams EF. Novel treatment approaches in cardiology. 
                      J Med Sci. 2023;45(2):123-135.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Book Example:</h4>
                    <p className="bg-muted p-3 rounded text-sm">
                      2. Brown GH. Medical Research Methods. 3rd ed. New York: Academic Press; 2022.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="figures-tables">
                <AccordionTrigger className="text-xl font-semibold">
                  Figures and Tables
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Figures</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Submit high-resolution images (minimum 300 DPI)</li>
                      <li>• Acceptable formats: JPEG, PNG, TIFF</li>
                      <li>• Include clear, descriptive captions</li>
                      <li>• Number figures consecutively (Figure 1, Figure 2, etc.)</li>
                      <li>• Ensure patient anonymity in clinical images</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Tables</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Create using Word table function, not images</li>
                      <li>• Include descriptive titles above tables</li>
                      <li>• Number tables consecutively (Table 1, Table 2, etc.)</li>
                      <li>• Use footnotes for additional explanations</li>
                      <li>• Ensure data is clearly presented and readable</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ethical-considerations">
                <AccordionTrigger className="text-xl font-semibold">
                  Ethical Considerations
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Human Studies</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Obtain institutional review board (IRB) approval</li>
                      <li>• Include IRB approval number in manuscript</li>
                      <li>• Ensure informed consent from participants</li>
                      <li>• Protect patient confidentiality and anonymity</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Animal Studies</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Follow international guidelines for animal research</li>
                      <li>• Obtain institutional animal care committee approval</li>
                      <li>• Minimize animal suffering and use alternatives when possible</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="submission-process">
                <AccordionTrigger className="text-xl font-semibold">
                  Submission Process
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                    <li>Prepare manuscript according to guidelines</li>
                    <li>Complete online submission form on our website</li>
                    <li>Upload manuscript file and supplementary materials</li>
                    <li>Provide complete author information and affiliations</li>
                    <li>Include conflict of interest statement</li>
                    <li>Submit for initial editorial review</li>
                    <li>Respond to reviewer comments if manuscript is sent for peer review</li>
                    <li>Make required revisions and resubmit</li>
                    <li>Receive final editorial decision</li>
                    <li>Complete publication agreement upon acceptance</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <Mail className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Our editorial team is here to assist you with your submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For questions about manuscript preparation or submission guidelines:
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Email: ijmmslth@yahoo.com</p>
                  <p className="font-medium">Phone: +234 802 416 5579</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthorGuidelines;
