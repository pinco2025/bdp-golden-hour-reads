// In serverless mode, call same-origin API routes
const API_BASE_URL = '';

// API Response types
interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

interface Subscriber {
  id: string;
  email: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'rather_not_say';
  interests?: string[];
  profile_completed: boolean;
}

interface SubscriptionData {
  email: string;
  name: string;
  subscription_source?: string;
}

interface ProfileUpdateData {
  name?: string;
  age?: number;
  gender?: 'male' | 'female' | 'rather_not_say';
  interests?: string[];
}

// API utility functions
class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || `HTTP ${response.status}`,
          message: data.message,
        };
      }

      return { data, message: data.message };
    } catch (error) {
      console.error('API Error:', error);
      return {
        error: 'Network error. Please check your connection and try again.',
      };
    }
  }

  // Subscribe to newsletter
  async subscribe(subscriptionData: SubscriptionData): Promise<ApiResponse<{ subscriber: Subscriber }>> {
    return this.request<{ subscriber: Subscriber }>('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  // Get profile by token
  async getProfile(token: string): Promise<ApiResponse<{ subscriber: Subscriber }>> {
    return this.request<{ subscriber: Subscriber }>(`/api/profile/${token}`);
  }

  // Update profile by token
  async updateProfile(
    token: string,
    profileData: ProfileUpdateData
  ): Promise<ApiResponse<{ subscriber: Subscriber }>> {
    return this.request<{ subscriber: Subscriber }>(`/api/profile/${token}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; message: string }>> {
    return this.request<{ status: string; message: string }>('/health');
  }
}

export const apiClient = new ApiClient();

// Export types for use in components
export type { Subscriber, SubscriptionData, ProfileUpdateData, ApiResponse };