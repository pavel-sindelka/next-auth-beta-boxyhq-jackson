import jackson from "@/lib/jackson";
import {NextResponse} from "next/server";
import {SAMLResponsePayload} from "@boxyhq/saml-jackson";

export async function POST(req: Request) {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    const {oauthController} = await jackson();
    const {redirect_url} = await oauthController.samlResponse(body as unknown as SAMLResponsePayload);

    return NextResponse.redirect(redirect_url as string, {status: 302});
}
