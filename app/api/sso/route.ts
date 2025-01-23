import jackson from "@/lib/jackson";
import {NextResponse} from "next/server";

export async function POST() {
    const {apiController} = await jackson();
    const res = await apiController.createSAMLConnection({
            name: 'TEST NAME',
            label: '',
            description: '',
            product: process.env.PRODUCT!,
            defaultRedirectUrl: `${process.env.NEXTAUTH_URL}/auth/idp-login`,
            forceAuthn: false,
            encodedRawMetadata: process.env.ENCODED_RAW_METADATA!,
            redirectUrl: `${process.env.NEXTAUTH_URL}`,
            metadataUrl: '',
            tenant: process.env.TENANT!
        }
    )

    return NextResponse.json(res);
}

export async function DELETE() {
    const {apiController} = await jackson();
    await apiController.deleteConnections({
        tenant: process.env.TENANT!,
        product: process.env.PRODUCT!
    })

    return NextResponse.json({message: 'Connection deleted'});
}
