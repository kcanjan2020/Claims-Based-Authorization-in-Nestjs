declare const _default: (() => {
    secret: string;
    issuer: string;
    audience: string;
    accessTokenTtl: number;
    refreshTokenTtl: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string;
    issuer: string;
    audience: string;
    accessTokenTtl: number;
    refreshTokenTtl: number;
}>;
export default _default;
