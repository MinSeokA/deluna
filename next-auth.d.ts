// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      global_name: string;
      avatar: string;  
      guilds: any;
    };
  }

  interface JWT {
    id: string;
    email: string;
    username: string;
    global_name: string;
    avatar: string;
    guilds: any;
  }
}
