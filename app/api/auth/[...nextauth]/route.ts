import getGuilds from "@/app/utils/getGuilds";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler =  NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string, // 타입 단언
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string, // 타입 단언
      authorization: { params: { scope: "email guilds identify", // 필요한 권한
    } },

    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt", // JWT 기반 세션
  },
  callbacks: {
    async jwt({ token, account }) {
      // account 객체가 있을 때만 token을 업데이트
      if (account) {
        const res = await fetch('https://discord.com/api/v10/users/@me', {
          headers: {
            Authorization: `Bearer ${account?.access_token}`,
          },
        });
        const data = await res.json();

        token.id = data.id
        token.email = data.email
        token.username = data.username;
        token.global_name = data.global_name;
        token.avatar = data.avatar;
        token.guilds = await getGuilds(account.access_token as string);
        
      }
      return token;
    },
    async session({ session, token }) {
      // session.user가 undefined일 가능성 처리
      if (session?.user) {
        // 'token.email'과 'token.username'을 string으로 단언
        session.user.id = token.id as string; // id는 반드시 string이어야 하므로 타입 단언
        session.user.email = token.email as string; // email을 string으로 단언
        session.user.username = token.username as string; // username을 string으로 단언
        session.user.global_name = token.global_name as string;
        session.user.avatar = token.avatar as string;
        session.user.guilds = token.guilds; // 세션에 길드 정보
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
