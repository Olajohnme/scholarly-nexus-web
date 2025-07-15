
import React from 'react';
import { Shield, Users, FileCheck, AlertTriangle, Scale, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PublicationEthics = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Publication Ethics
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Upholding the highest standards of research integrity and ethical publishing practices
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Ethical Commitments</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              IJMMS is committed to maintaining the highest ethical standards in medical publishing, 
              following international guidelines and best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <FileCheck className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle>Research Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Ensuring all published research meets the highest standards of scientific rigor 
                  and ethical conduct.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle>Peer Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Fair, unbiased, and transparent peer review process with qualified reviewers 
                  in relevant fields.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Scale className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle>Editorial Independence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Editorial decisions based solely on scientific merit, free from commercial 
                  or personal interests.
                </p>
              </CardContent>
            </Card>
          </div>

          <Alert className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Committee on Publication Ethics (COPE)</AlertTitle>
            <AlertDescription>
              IJMMS follows the guidelines and recommendations of the Committee on Publication Ethics (COPE) 
              for handling ethical issues in publishing.
            </AlertDescription>
          </Alert>

          {/* Detailed Ethics Guidelines */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Ethical Guidelines</h2>
            
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="author-responsibilities">
                <AccordionTrigger className="text-xl font-semibold">
                  Author Responsibilities
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Originality and Plagiarism</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Authors must submit only original work</li>
                      <li>• Proper citation of all sources is required</li>
                      <li>• Self-plagiarism and duplicate submission are prohibited</li>
                      <li>• Use of AI tools must be disclosed and acknowledged</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Authorship Criteria</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Substantial contribution to conception or design</li>
                      <li>• Acquisition, analysis, or interpretation of data</li>
                      <li>• Drafting or critical revision of manuscript</li>
                      <li>• Final approval of version to be published</li>
                      <li>• Agreement to be accountable for all aspects of work</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Conflict of Interest</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Disclose all financial and personal relationships</li>
                      <li>• Include funding sources and sponsor roles</li>
                      <li>• Declare any competing interests</li>
                      <li>• Update disclosures if circumstances change</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reviewer-responsibilities">
                <AccordionTrigger className="text-xl font-semibold">
                  Reviewer Responsibilities
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Review Process</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Provide objective, constructive feedback</li>
                      <li>• Complete reviews in a timely manner</li>
                      <li>• Maintain confidentiality of manuscript content</li>
                      <li>• Disclose any conflicts of interest</li>
                      <li>• Decline review if not qualified in the subject area</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Ethical Obligations</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Report suspected misconduct to editors</li>
                      <li>• Do not use unpublished information for personal gain</li>
                      <li>• Avoid personal attacks or inappropriate language</li>
                      <li>• Respect authors' intellectual property</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="editorial-responsibilities">
                <AccordionTrigger className="text-xl font-semibold">
                  Editorial Responsibilities
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Editorial Decisions</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Base decisions solely on scientific merit</li>
                      <li>• Ensure fair and unbiased peer review</li>
                      <li>• Maintain confidentiality of submissions</li>
                      <li>• Handle appeals and complaints appropriately</li>
                      <li>• Disclose any conflicts of interest</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Quality Assurance</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Select qualified reviewers</li>
                      <li>• Monitor review process for fairness</li>
                      <li>• Ensure adherence to publication standards</li>
                      <li>• Investigate allegations of misconduct</li>
                      <li>• Issue corrections and retractions when necessary</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="research-ethics">
                <AccordionTrigger className="text-xl font-semibold">
                  Research Ethics Requirements
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Human Subjects Research</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Institutional Review Board (IRB) approval required</li>
                      <li>• Informed consent from all participants</li>
                      <li>• Protection of participant privacy and confidentiality</li>
                      <li>• Adherence to Declaration of Helsinki principles</li>
                      <li>• Registration in appropriate clinical trial databases</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Animal Research</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Institutional Animal Care and Use Committee approval</li>
                      <li>• Follow national and international guidelines</li>
                      <li>• Minimize animal suffering and use</li>
                      <li>• Justify use of animals and number used</li>
                      <li>• Consider alternatives to animal testing</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="misconduct-handling">
                <AccordionTrigger className="text-xl font-semibold">
                  Research Misconduct and Handling
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Types of Misconduct</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Fabrication or falsification of data</li>
                      <li>• Plagiarism and duplicate publication</li>
                      <li>• Inappropriate authorship practices</li>
                      <li>• Undisclosed conflicts of interest</li>
                      <li>• Violation of research ethics guidelines</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Investigation Process</h4>
                    <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                      <li>Initial assessment of allegations</li>
                      <li>Formal investigation if warranted</li>
                      <li>Notification of relevant parties</li>
                      <li>Opportunity for response from accused</li>
                      <li>Decision and appropriate sanctions</li>
                      <li>Corrections, retractions, or other remedies</li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="appeals-complaints">
                <AccordionTrigger className="text-xl font-semibold">
                  Appeals and Complaints
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Appeal Process</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Authors may appeal editorial decisions</li>
                      <li>• Appeals must be based on substantive grounds</li>
                      <li>• Independent review of appeal cases</li>
                      <li>• Timely response to all appeals</li>
                      <li>• Final decisions are binding</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Complaint Handling</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• All complaints investigated thoroughly</li>
                      <li>• Confidential and fair investigation process</li>
                      <li>• Appropriate remedial actions taken</li>
                      <li>• Feedback provided to complainants</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <Eye className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle>Report Ethical Concerns</CardTitle>
                <CardDescription>
                  We take all ethical concerns seriously and investigate them thoroughly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  To report suspected research misconduct or ethical violations:
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Email: ijmmslth@yahoo.com</p>
                  <p className="font-medium">Phone: +234 802 416 5579</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    All reports are treated confidentially and investigated according to established procedures.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicationEthics;
