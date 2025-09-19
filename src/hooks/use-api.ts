import { useState } from 'react';
import { apiClient, type SubscriptionData, type ProfileUpdateData, type ApiResponse, type Subscriber } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Generic API hook for handling loading states and errors
export function useApiRequest<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const execute = async <R>(
    apiCall: () => Promise<ApiResponse<T>>,
    options: {
      onSuccess?: (data: T, message?: string) => void;
      onError?: (error: string) => void;
      successToast?: boolean;
      errorToast?: boolean;
    } = {}
  ): Promise<ApiResponse<T>> => {
    const {
      onSuccess,
      onError,
      successToast = true,
      errorToast = true
    } = options;

    setIsLoading(true);
    setError(null);

    try {
      const result = await apiCall();

      if (result.error) {
        setError(result.error);
        if (errorToast) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        }
        onError?.(result.error);
      } else if (result.data) {
        if (successToast && result.message) {
          toast({
            title: "Success",
            description: result.message,
          });
        }
        onSuccess?.(result.data, result.message);
      }

      return result;
    } catch (err) {
      const errorMessage = 'An unexpected error occurred';
      setError(errorMessage);
      if (errorToast) {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      onError?.(errorMessage);
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
}

// Hook for newsletter subscription
export function useSubscription() {
  const { execute, isLoading, error } = useApiRequest<{ subscriber: Subscriber }>();

  const subscribe = async (
    subscriptionData: SubscriptionData,
    options?: {
      onSuccess?: (subscriber: Subscriber, message?: string) => void;
      onError?: (error: string) => void;
    }
  ) => {
    return execute(
      () => apiClient.subscribe(subscriptionData),
      {
        onSuccess: (data, message) => options?.onSuccess?.(data.subscriber, message),
        onError: options?.onError,
        successToast: true,
        errorToast: true,
      }
    );
  };

  return { subscribe, isLoading, error };
}

// Hook for profile management
export function useProfile() {
  const [profile, setProfile] = useState<Subscriber | null>(null);
  const { execute, isLoading, error } = useApiRequest<{ subscriber: Subscriber }>();

  const getProfile = async (
    token: string,
    options?: {
      onSuccess?: (subscriber: Subscriber) => void;
      onError?: (error: string) => void;
    }
  ) => {
    return execute(
      () => apiClient.getProfile(token),
      {
        onSuccess: (data, message) => {
          setProfile(data.subscriber);
          options?.onSuccess?.(data.subscriber);
        },
        onError: options?.onError,
        successToast: false, // Don't show success toast for fetching
        errorToast: true,
      }
    );
  };

  const updateProfile = async (
    token: string,
    profileData: ProfileUpdateData,
    options?: {
      onSuccess?: (subscriber: Subscriber, message?: string) => void;
      onError?: (error: string) => void;
    }
  ) => {
    return execute(
      () => apiClient.updateProfile(token, profileData),
      {
        onSuccess: (data, message) => {
          setProfile(data.subscriber);
          options?.onSuccess?.(data.subscriber, message);
        },
        onError: options?.onError,
        successToast: true,
        errorToast: true,
      }
    );
  };

  return { profile, getProfile, updateProfile, isLoading, error };
}