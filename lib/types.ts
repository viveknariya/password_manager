export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  stripe_customer_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Otp {
  id: string;
  email: string;
  code: string;
  expires_at: Date;
  used: boolean;
  created_at: Date;
}
export interface InstagramAccount {
  id: string;
  user_id: string;
  email: string;
  password: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthContext {
  userId: string;
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  url: string;
}
