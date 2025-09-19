import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, CheckCircle, User, Heart, BookOpen, Brain, Briefcase, Home, Star } from 'lucide-react';
import { useProfile } from '@/hooks/use-api';

export default function ProfileCompletion() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  
  const { profile, getProfile, updateProfile, isLoading, error } = useProfile();
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '' as 'male' | 'female' | 'rather_not_say' | '',
    interests: [] as string[]
  });
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available interests
  const availableInterests = [
    { id: 'wellness', label: 'Health & Wellness', icon: Heart },
    { id: 'finance', label: 'Finance & Investing', icon: Briefcase },
    { id: 'technology', label: 'Technology & Digital', icon: Brain },
    { id: 'self_development', label: 'Self Development', icon: Star },
    { id: 'business', label: 'Business & Entrepreneurship', icon: Briefcase },
    { id: 'lifestyle', label: 'Lifestyle & Home', icon: Home },
    { id: 'psychology', label: 'Psychology & Mindset', icon: Brain },
    { id: 'fiction', label: 'Fiction & Literature', icon: BookOpen }
  ];

  // Load profile on component mount
  useEffect(() => {
    if (token) {
      getProfile(token, {
        onSuccess: (subscriber) => {
          setFormData({
            name: subscriber.name || '',
            age: subscriber.age?.toString() || '',
            gender: subscriber.gender || '',
            interests: subscriber.interests || []
          });
          
          // If profile is already completed, show success state
          if (subscriber.profile_completed) {
            setIsCompleted(true);
          }
        },
        onError: (error) => {
          console.error('Failed to load profile:', error);
        }
      });
    }
  }, [token]);

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      gender: value as 'male' | 'female' | 'rather_not_say'
    }));
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const isFormValid = () => {
    const age = parseInt(formData.age);
    return (
      formData.name.trim() !== '' &&
      formData.gender !== '' &&
      !isNaN(age) &&
      age >= 13 &&
      age <= 120 &&
      formData.interests.length > 0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !isFormValid()) return;
    
    setIsSubmitting(true);
    
    const result = await updateProfile(token, {
      name: formData.name.trim(),
      age: parseInt(formData.age),
      gender: formData.gender as 'male' | 'female' | 'rather_not_say',
      interests: formData.interests
    }, {
      onSuccess: (subscriber, message) => {
        setIsCompleted(true);
      },
      onError: (error) => {
        console.error('Profile update failed:', error);
      }
    });
    
    setIsSubmitting(false);
  };

  // Loading state
  if (isLoading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <Card className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading your profile...</p>
        </Card>
      </div>
    );
  }

  // Error state
  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
        <Card className="p-8 text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The profile link appears to be invalid or expired. Please check your email for the correct link.
          </p>
          <Button onClick={() => navigate('/')} variant="outline">
            Return to Homepage
          </Button>
        </Card>
      </div>
    );
  }

  // Success state
  if (isCompleted && profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-background to-green-50 px-4">
        <Card className="p-8 text-center max-w-lg">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Profile Complete!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you, {profile.name}! Your profile has been completed successfully. 
            You'll now receive personalized book recommendations based on your interests.
          </p>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Your Interests:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {profile.interests?.map((interestId) => {
                const interest = availableInterests.find(i => i.id === interestId);
                return interest ? (
                  <span key={interestId} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {interest.label}
                  </span>
                ) : null;
              })}
            </div>
          </div>
          <div className="space-y-3">
            <Button onClick={() => navigate('/')} className="w-full">
              Explore Our Books
            </Button>
            <p className="text-xs text-muted-foreground">
              Check your email for a thank you message and welcome guide!
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Profile completion form
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Help us personalize your reading experience by sharing a bit about yourself.
          </p>
        </div>

        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
                placeholder="Enter your full name"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="13"
                max="120"
                value={formData.age}
                onChange={handleInputChange('age')}
                placeholder="Enter your age"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label>Gender</Label>
              <RadioGroup value={formData.gender} onValueChange={handleGenderChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" disabled={isSubmitting} />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" disabled={isSubmitting} />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rather_not_say" id="rather_not_say" disabled={isSubmitting} />
                  <Label htmlFor="rather_not_say">Rather not say</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label>Reading Interests</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Select all topics that interest you (choose at least one):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableInterests.map((interest) => {
                  const IconComponent = interest.icon;
                  return (
                    <div key={interest.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest.id}
                        checked={formData.interests.includes(interest.id)}
                        onCheckedChange={() => handleInterestToggle(interest.id)}
                        disabled={isSubmitting}
                      />
                      <Label 
                        htmlFor={interest.id} 
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{interest.label}</span>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Completing Profile...
                  </>
                ) : (
                  'Complete Profile'
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Your information helps us provide personalized book recommendations and content that matches your interests.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}