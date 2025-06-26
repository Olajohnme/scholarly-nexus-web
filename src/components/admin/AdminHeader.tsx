
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const AdminHeader: React.FC = () => {
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage article submissions and publications</p>
      </div>
      <Button
        onClick={handleLogout}
        variant="outline"
        className="flex items-center space-x-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </Button>
    </div>
  );
};
