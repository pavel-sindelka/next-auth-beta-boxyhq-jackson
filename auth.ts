import NextAuth from "next-auth"
import BoxyHQSAML from "next-auth/providers/boxyhq-saml"

export const {handlers, auth, signIn, signOut} = NextAuth({
    debug: true,
    providers: [
        BoxyHQSAML({
            authorization: {params: {scope: ""}},
            clientId: "dummy",
            clientSecret: "dummy",
            issuer: process.env.ISSUER || process.env.NEXTAUTH_URL,
            checks: ["pkce", "state"],
        }),
    ],
    cookies: {
        // state: {
        //     name: "next-auth.state",
        //     options: {
        //         httpOnly: true,
        //         sameSite: "none",
        //         path: "/",
        //         secure: true,
        //     },
        // },
        // pkceCodeVerifier: {
        //     name: "next-auth.pkce.code_verifier",
        //     options: {
        //         httpOnly: true,
        //         sameSite: "none",
        //         path: "/",
        //         secure: true,
        //     },
        // },
    },
    callbacks: {
        async signIn({account, profile}) {
            return true;
        },
    },
})
