import type RegisterData from "@/models/RegisterData";
import apiClient, { refreshClient } from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
import type User from "@/models/User";
//register function
export const registerUser = async (signupData: RegisterData) => {
  // api  call to server to save data
  const response = await apiClient.post(`/auth/register`, signupData);
  return response.data;
};

//login

export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post<LoginResponseData>(
    "/auth/login",
    loginData
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post(`/auth/logout`);
  return response.data;
};

//get current login user
export const getCurrentUser = async () => {
  const response = await apiClient.get<User>(`/users/me`);
  return response.data;
};

//refresh token

export const refreshToken = async () => {
  const response = await refreshClient.post<LoginResponseData>(`/auth/refresh`);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await apiClient.get<{ message: string }>(
    `/auth/verify-email?token=${encodeURIComponent(token)}`
  );
  return response.data;
};

export const resendVerification = async (email: string) => {
  const response = await apiClient.post<{ message: string }>(
    `/auth/resend-verification`,
    { email }
  );
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await apiClient.post<{ message: string }>(
    `/auth/forgot-password`,
    { email }
  );
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await apiClient.post<{ message: string }>(
    `/auth/reset-password`,
    { token, newPassword }
  );
  return response.data;
};

export const getAllUsersByAdmin = async () => {
  const response = await apiClient.get<User[]>(`/users`);
  return response.data;
};

type AdminCreateUserPayload = {
  email: string;
  name: string;
  password: string;
  enabled?: boolean;
};

export const createUserByAdmin = async (payload: AdminCreateUserPayload) => {
  const response = await apiClient.post<User>(`/users`, {
    email: payload.email,
    name: payload.name,
    password: payload.password,
    enable: payload.enabled ?? true,
  });
  return response.data;
};

export const deleteUserByAdmin = async (userId: string) => {
  await apiClient.delete(`/users/${userId}`);
};