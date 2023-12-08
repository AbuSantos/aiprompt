import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@models/User";
console.log({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      //get updated constantly on the user
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        //connect to the db and we check if the user is there.
        await connectDB();
        const userExist = await User.findOne({
          email: profile?.email,
        });

        //if not, we create a new one
        if (!userExist) {
          await User.create({
            email: profile.email,
            //ensuring theres no space
            username: profile.name.replace(" ", " ").toLocaleLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
