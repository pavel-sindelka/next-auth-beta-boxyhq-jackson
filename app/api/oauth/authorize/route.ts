import jackson from "@/lib/jackson";
import {NextResponse} from "next/server";
import type {OAuthReq} from "@boxyhq/saml-jackson";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const body = Object.fromEntries(searchParams);

    const {oauthController} = await jackson();
    const {redirect_url} = await oauthController.authorize(body as OAuthReq);

    return NextResponse.redirect(redirect_url as string, { status: 302 });
}

