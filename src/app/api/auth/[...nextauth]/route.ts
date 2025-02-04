import { ILoginRequest } from "@/app/core";
import { AuthService } from "@/app/infrastructure/services/auth.service";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthToken {
    id?: string;
    jwt?: string;
}

interface AuthUser {
    id: string;
    email: string;
    jwt: string;
}

export interface CustomSession extends Session {
    user: {
        id?: string;
        jwt?: string;
        email?: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                Email: {label: "Email", type: "email"},
                PasswordHash: {label: "Password", type: "password"},
        },
        authorize: async (credentials) => {
            if (!credentials?.Email || !credentials?.PasswordHash) {
                console.error("Credenciales faltantes")
                return null;
        }
            const loginRequest: ILoginRequest = {
                Email: credentials.Email,
                PasswordHash: credentials.PasswordHash,
            }

            try {
                const authService = new AuthService();
                const response = await authService.login(loginRequest);
                if (!response.jwt) {
                    console.error("El token de acceso no está presente en la respuesta del login");
                }
                const user = response.jwt;
                if (!user || !response.jwt) {
                    console.error("Datos de usuario o token de acceso faltantes en authorize");
                }
                
                return {
                    jwt: response.jwt,
                } as AuthUser
            } catch (error) {
                console.log(error);
                return Promise.reject(new Error(JSON.stringify(error)))
            }
        },
}),
    ],
    session: {
        strategy: "jwt", 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as AuthUser;
                if (!authUser.jwt) {
                    console.error("El token de usuario es undefined o null");
                }
                token.id = authUser.id;
                token.token = authUser.jwt;
                token.email= authUser.email;
            }
            return token;
        },
        async session({session, token}){
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id;
            customSession.user.jwt = (token as AuthToken).jwt;
            return customSession;
    },
}
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);