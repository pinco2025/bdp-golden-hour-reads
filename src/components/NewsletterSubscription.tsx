import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, User, Loader2, CheckCircle } from 'lucide-react';
import { useSubscription } from '@/hooks/use-api';

interface NewsletterSubscriptionProps {
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
  title?: string;
  description?: string;
}

export default function NewsletterSubscription({ 
  variant = 'default',
  className = '',
  title,
  description 
}: NewsletterSubscriptionProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { subscribe, isLoading, error } = useSubscription();

  // Form validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = formData.email.trim() !== '' && 
                     formData.name.trim() !== '' && 
                     isValidEmail(formData.email);

  const handleInputChange = (field: 'email' | 'name') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    await subscribe(
      { 
        email: formData.email.trim(), 
        name: formData.name.trim(),
        subscription_source: 'website'
      },
      {
        onSuccess: (subscriber, message) => {
          setIsSubscribed(true);
          // Reset form
          setFormData({ email: '', name: '' });
        }
      }
    );
  };

  // Success state
  if (isSubscribed) {
    return (
      <Card className={`p-6 text-center bg-green-50/80 border-green-200 ${className}`}>
        <div className="flex flex-col items-center gap-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Welcome to our community!
            </h3>
            <p className="text-green-700 text-sm">
              Thank you for subscribing! Check your email for a welcome message and 
              next steps to complete your profile.
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsSubscribed(false)}
            className="text-green-700 border-green-300 hover:bg-green-100"
          >
            Subscribe Another Email
          </Button>
        </div>
      </Card>
    );
  }

  // Compact variant for smaller spaces
  if (variant === 'compact') {
    return (
      <Card className={`p-4 ${className}`}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="text-center">
            <h4 className="font-semibold text-sm mb-1">
              {title || "Stay Updated"}
            </h4>
            <p className="text-xs text-muted-foreground">
              {description || "Get the latest updates and exclusive content"}
            </p>
          </div>
          
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange('name')}
              className="text-sm"
              disabled={isLoading}
            />
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              className="text-sm"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            size="sm" 
            className="w-full text-sm"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      </Card>
    );
  }

  // Inline variant for embedding in content
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <Input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleInputChange('name')}
          className="flex-1"
          disabled={isLoading}
        />
        <Input
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleInputChange('email')}
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          type="submit"
          disabled={!isFormValid || isLoading}
          className="px-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
    );
  }

  // Default variant - full featured
  return (
    <Card className={`p-6 ${className}`}>
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Mail className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">
          {title || "Join Our Reading Community"}
        </h3>
        <p className="text-muted-foreground">
          {description || "Be the first to discover new releases, exclusive content, and special offers. Your next favorite book is just a click away."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange('name')}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Subscribe to Newsletter
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By subscribing, you'll receive personalized book recommendations and exclusive updates. 
          We respect your privacy and you can unsubscribe at any time.
        </p>
      </form>
    </Card>
  );
}