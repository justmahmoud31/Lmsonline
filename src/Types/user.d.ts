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
  