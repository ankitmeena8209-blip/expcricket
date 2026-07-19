export interface AuthUser {
  id: string;
  email: string;
  role: "ADMIN" | "ANALYST" | "USER";
  name: string;
}

export class AuthService {
  static async getCurrentUser(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "usr_admin_01",
          email: "admin@expcricket.com",
          role: "ADMIN",
          name: "EXP Analyst Pro",
        });
      }, 50);
    });
  }

  static async login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Boolean(username && password));
      }, 100);
    });
  }

  static async logout(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 50));
  }
}
