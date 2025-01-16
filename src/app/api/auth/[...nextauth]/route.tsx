import NextAuth from "next-auth";
import CredientialsProvider from "next-auth/providers/credentials";

import { compareSync } from "bcrypt";

export const authOptions = {
	providers: [
		CredientialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			credentials: {
				email: {
					label: "email",
					type: "email",
					placeholder: "jsmith@text.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "contraseña",
				},
			},
			async authorize(credentials, req) {
				const {
					users: [userFinded],
				} = await fetch(
					`${process.env.API_URL}/api/v2/users?email[eq]=${credentials.email}`
				)
					.then((res) => res.json())
					.catch((error) => console.log(error));

				const saltIndex = userFinded?.password.substring(0, 3);
				const hashedPassword =
					saltIndex === "$2y"
						? userFinded?.password.replace("$2y", "$2a")
						: userFinded?.password;

				const isCorrectPasswword = compareSync(
					credentials.password,
					hashedPassword ?? ""
				);

				// Comprobamos si las credenciales coinciden con las hardcodeadas
				if (credentials.email === userFinded?.email && isCorrectPasswword) {
					const user = userFinded;

					// Si coinciden, devolvemos el usuario
					return user;
				} else {
					// Si no coinciden, devolvemos null y mostrará un mensaje de error
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	// secret: "pupu123123",
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token;

			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
