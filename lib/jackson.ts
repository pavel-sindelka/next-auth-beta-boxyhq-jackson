import jackson, {
    type IOAuthController,
    type JacksonOption,
    type IConnectionAPIController,
    type IDirectorySyncController,
    type ISPSSOConfig,
} from "@boxyhq/saml-jackson";

const samlAudience = "https://saml.boxyhq.com";
const samlPath = "/api/oauth/saml";

const opts: JacksonOption = {
    externalUrl: `${process.env.NEXTAUTH_URL}`,
    samlAudience,
    samlPath,
    db: {
        engine: 'mem',
    },
    // db: {
    //     engine: "sql",
    //     type: "postgres",
    //     url: "postgresql://postgres:postgres@localhost:6500/mydb?schema=public",
    // },
};


let apiController: IConnectionAPIController;
let oauthController: IOAuthController;
let directorySync: IDirectorySyncController;
let spConfig: ISPSSOConfig;

const g = global as any;

export default async function init() {
    if (
        !g.apiController ||
        !g.oauthController ||
        !g.directorySync ||
        !g.spConfig
    ) {
        const ret = await jackson(opts);

        apiController = ret.apiController;
        oauthController = ret.oauthController;
        directorySync = ret.directorySyncController;
        spConfig = ret.spConfig;

        g.apiController = apiController;
        g.oauthController = oauthController;
        g.directorySync = directorySync;
        g.spConfig = spConfig;
    } else {
        apiController = g.apiController;
        oauthController = g.oauthController;
        directorySync = g.directorySync;
        spConfig = g.spConfig;
    }

    return {
        apiController,
        oauthController,
        directorySync,
        spConfig,
    };
}
