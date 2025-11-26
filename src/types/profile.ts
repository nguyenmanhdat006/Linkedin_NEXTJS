// types/profile.ts

// 1. Định nghĩa các Type cố định (Union Types)
export type ConnectionStatus = 'PENDING' | 'CONNECTED' | 'NONE' | 'REJECTED';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship' | string;

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  employmentType: EmploymentType; // Dùng type cụ thể
  startDate: string; // "YYYY-MM-DD"
  endDate: string | null; // null nếu đang làm việc
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id?: number;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: number;
  activities?: string;
  description?: string;
  displayOrder?: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  endorsementCount: number;
  isEndorsedByCurrentUser: boolean;
  description?: string; 
}


export interface ProfileData {
  id: number;
  email: string;
  fullName: string;
  headline: string;
  // Các trường này có thể nullable hoặc optional tùy backend
  avatarUrl: string | null; 
  bannerUrl: string | null;
  location: string;
  about: string;
  website: string | null; // Website thường có thể null
  phone: string;
  
  // Stats
  connectionCount: number;
  followerCount: number;
  followingCount: number;
  
  // Status & Flags
  isOwnProfile: boolean;
  isConnected: boolean;
  connectionStatus: ConnectionStatus; // Dùng Union Type để check điều kiện chính xác
  isFollowing: boolean;
  verified: boolean;
  active: boolean;
  
  createdAt: string; // ISO string
  
  // Relations
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
  timestamp: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  headline?: string;
  about?: string;
  city?: string;
  country?: string;
  website?: string | null;
  phone?: string | null;
}