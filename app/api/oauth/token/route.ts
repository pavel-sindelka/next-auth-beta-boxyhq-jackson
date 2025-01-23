import jackson from '@/lib/jackson';
import {NextResponse} from "next/server";
import {OAuthTokenReq} from "@boxyhq/saml-jackson/dist/typings";

export async function POST(req: Request) {
    const formData = await req.formData();
    const body = Object.fromEntries(formData)

    const {oauthController} = await jackson();
    const response = await oauthController.token(body as unknown as OAuthTokenReq);

    return NextResponse.json(response);
}
