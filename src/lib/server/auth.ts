interface AuthUser {
  id?: string;
  fullName?: string;
  email?: string;
  role?: string;
  username?: string;
  isVerified?: boolean;
  progress?: number;
  token?: string;
  tokenExpiredAt?: number;
  loggedIn?: boolean;
  isAuthenticated?: boolean;
  isFetching?: boolean;
}

const Authentication = () => {
  const fetchFn = async (path: string, body?: object): Promise<AuthUser | null> => {
    const url = `http://localhost:8000/auth${path}`;
    try {
      const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });

      const data = await result.json();
      return { ...data };
    } catch (err) {
      // console.error(err);
      return null;
    }
  };

  return {
    refresh: async () => await fetchFn("/refresh_token"),
    signin: async (body: object) => await fetchFn("/signin", body),
    signup: async (body: object) => await fetchFn("/signup", body),
    signout: async (body: object) => await fetchFn("/signout", body),
    verifyEmail: async (body: object) => await fetchFn("/verify_email", body),
    changePassword: async (body: object) => await fetchFn("/change_password", body),
    resetPassword: async (body: object) => await fetchFn("/reset_password", body),
  };
};

export const auth = Authentication();
