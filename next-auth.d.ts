import NextAuth from "next-auth";
declare module "next-auth" {
    interface Session {
      user: {
        id?: string;
        token?: string;
        email?: string | null;
        role?: string | null;
        photo?: string | null;
      };
    }
  }