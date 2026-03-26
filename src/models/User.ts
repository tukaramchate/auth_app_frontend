import type Role from "./Role";

export default interface User {
  id: string;
  email: string;
  name?: string;
  enabled: boolean;
  image?: string;
  updatedAt?: string;
  createdAt?: string;
  provider: string;
  roles?: Role[];
}