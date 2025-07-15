
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Building, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Get in touch with the editorial team of the Integrated Journal of Medicine and Medical Sciences
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information Cards */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Building className="w-6 h-6 text-primary" />
                    <CardTitle>Editorial Office</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">Integrated Journal of Medicine and Medical Sciences</p>
                    <p className="text-muted-foreground">LAUTECH Teaching Hospital, Ogbomoso</p>
                    <p className="text-muted-foreground">Opposite CMAC's Office</p>
                    <p className="text-muted-foreground">Fourth Floor, Administrative Building</p>
                    <p className="text-muted-foreground">PMB 4007, Ogbomoso</p>
                    <p className="text-muted-foreground">Oyo State, Nigeria</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-primary" />
                    <CardTitle>Email & Phone</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">ijmmslth@yahoo.com</p>
                        <p className="text-sm text-muted-foreground">General inquiries & submissions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">+234 802 416 5579</p>
                        <p className="text-sm text-muted-foreground">Office hours: Monday - Friday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <CardTitle>Office Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Email inquiries are responded to within 24-48 hours during business days.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <CardTitle>Payment Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Publication Fees:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Domestic Authors: ₦30,000</li>
                      <li>• International Authors: $100 / €70</li>
                    </ul>
                    
                    <h4 className="font-semibold mt-4">Banking Details:</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <p><strong>Bank:</strong> Access Bank</p>
                      <p><strong>Account Number:</strong> 0726206782</p>
                      <p><strong>Account Name:</strong> Integrated Journal of Medicine and Medical Sciences</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Send className="w-6 h-6 text-primary" />
                    <span>Send us a Message</span>
                  </CardTitle>
                  <CardDescription>
                    Have a question or need assistance? We're here to help!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter message subject"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message here..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <a href="/submit" className="text-primary hover:underline">Submit Manuscript</a>
                    <a href="/archives" className="text-primary hover:underline">Browse Archives</a>
                    <a href="/author-guidelines" className="text-primary hover:underline">Author Guidelines</a>
                    <a href="/editorial-board" className="text-primary hover:underline">Editorial Board</a>
                    <a href="/publication-ethics" className="text-primary hover:underline">Publication Ethics</a>
                    <a href="/about" className="text-primary hover:underline">About IJMMS</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
