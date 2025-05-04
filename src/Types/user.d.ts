// types/auth.ts
export interface LoginDto {
  email?: string;
  phoneNumber?: string;
  password: string;
  fcmToken?: string;
}

export interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    role: "ADMIN" | "USER" | string;
  };
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  gender: string;
  ProfileImage: string;
  role: string;
  stageId?: number;
  address?: string;
  city?: string;
  zipCode?: string;
  dob?: Date | string;
}
export interface getUserData {
  data: User;
}