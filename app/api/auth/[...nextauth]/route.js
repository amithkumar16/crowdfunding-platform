import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectdb from "@/db/connectdb";
import User from "@/models/User";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: "read:user user:email", // Request email scope
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "github") {
                // Connect to the database
                await connectdb();

                // Get email, fallback if missing
                const email = user.email || profile.email || `${profile.login}@github.com`;

                if (!email) {
                    console.error("No email available for GitHub sign-in.");
                    return false; // Deny sign-in if email is unavailable
                }

                // Check if the user exists in the database
                let currentUser = await User.findOne({ email });
                if (!currentUser) {
                    // Create a new user if not found
                    currentUser = new User({
                        email: email,
                        username: email.split("@")[0],
                    });
                    await currentUser.save();
                }

                // Attach username to user object
                user.name = currentUser.username;
                return true;
            }

            return false; // Deny sign-in for unsupported providers
        },
        async session({ session }) {
            await connectdb();

            // Find the user in the database
            const dbuser = await User.findOne({ email: session.user.email });
            if (dbuser) {
                session.user.name = dbuser.username;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
