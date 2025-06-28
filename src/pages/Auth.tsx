
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Lock, Phone, Building, GraduationCap } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const { user, loading, signUp, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    first_name: '',
    middle_name_initial: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    affiliated_institution: '',
    academic_qualification: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const { error } = await signIn(signInData.email, signInData.password);
    
    if (error) {
      setErrors({ signin: error.message });
    }
    
    setIsLoading(false);
  };

  const validateSignUpForm = () => {
    const newErrors: Record<string, string> = {};

    if (!signUpData.first_name) newErrors.first_name = 'First name is required';
    if (!signUpData.last_name) newErrors.last_name = 'Last name is required';
    if (!signUpData.email) newErrors.email = 'Email is required';
    if (!signUpData.password) newErrors.password = 'Password is required';
    if (signUpData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!signUpData.affiliated_institution) newErrors.affiliated_institution = 'Institution is required';
    if (!signUpData.academic_qualification) newErrors.academic_qualification = 'Academic qualification is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignUpForm()) return;
    
    setIsLoading(true);
    setErrors({});

    const { password, confirmPassword, ...profileData } = signUpData;
    
    const { error } = await signUp(signUpData.email, password, profileData);
    
    if (error) {
      setErrors({ signup: error.message });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Journal Access</CardTitle>
          <p className="text-muted-foreground">
            Sign in to submit articles or create an account to get started
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="your.email@institution.edu"
                      value={signInData.email}
                      onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInData.password}
                      onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                {errors.signin && (
                  <p className="text-sm text-destructive">{errors.signin}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="first_name"
                        type="text"
                        value={signUpData.first_name}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, first_name: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.first_name && <p className="text-xs text-destructive mt-1">{errors.first_name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="last_name"
                        type="text"
                        value={signUpData.last_name}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, last_name: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.last_name && <p className="text-xs text-destructive mt-1">{errors.last_name}</p>}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="middle_name_initial">Middle Name Initial</Label>
                  <Input
                    id="middle_name_initial"
                    type="text"
                    maxLength={1}
                    value={signUpData.middle_name_initial}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, middle_name_initial: e.target.value }))}
                    placeholder="M"
                  />
                </div>

                <div>
                  <Label htmlFor="signup-email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@institution.edu"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={signUpData.phone_number}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, phone_number: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="affiliated_institution">Affiliated Institution *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="affiliated_institution"
                      type="text"
                      placeholder="University/Institution Name"
                      value={signUpData.affiliated_institution}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, affiliated_institution: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.affiliated_institution && <p className="text-xs text-destructive mt-1">{errors.affiliated_institution}</p>}
                </div>

                <div>
                  <Label htmlFor="academic_qualification">Academic Qualification *</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="academic_qualification"
                      type="text"
                      placeholder="Ph.D., M.D., M.S., etc."
                      value={signUpData.academic_qualification}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, academic_qualification: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.academic_qualification && <p className="text-xs text-destructive mt-1">{errors.academic_qualification}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="signup-password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10"
                        minLength={6}
                        required
                      />
                    </div>
                    {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {errors.signup && (
                  <p className="text-sm text-destructive">{errors.signup}</p>
                )}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  By creating an account, you agree to our terms of service and privacy policy.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
