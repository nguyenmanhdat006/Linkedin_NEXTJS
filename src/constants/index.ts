export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    VERIFY: "/api/auth/verify",
    REFRESH: "/api/auth/refresh",
  },
  PROFILE: {
    BY_SLUG: (slug: string | number) => `/api/profile/${slug}`,
    ME: "/api/profile/me",
  },
  EDUCATION: {
    BY_USER: (userId: number) => `/api/educations/user/${userId}`,
    ROOT: "/api/educations",
    DETAIL: (id: number) => `/api/educations/${id}`,
  },
  EXPERIENCE: {
    BY_USER: (userId: number) => `/api/experiences/user/${userId}`,
    ROOT: "/api/experiences",
    DETAIL: (id: number) => `/api/experiences/${id}`,
  },
  SKILL: {
    ROOT: "/api/skills",
    BY_USER: (userId: number) => `/api/skills/user/${userId}`,
    DETAIL: (id: number) => `/api/skills/${id}`,
  },
  JOB: {
    ROOT: "/api/jobs",
    DETAIL: (id: string | number) => `/api/jobs/${id}`,
  },
  POST: {
    ROOT: "/api/posts",
    DETAIL: (id: string | number) => `/api/posts/${id}`,
  },
} as const;

export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY: "/auth/verify",
  },
  PROFILE: (slug: string | number) => `/profile/${slug}`,
  FEED: "/feed",
  JOBS: "/jobs",
  MESSAGING: "/messaging",
  NETWORK: "/network",
  NOTIFICATIONS: "/notifications",
} as const;
