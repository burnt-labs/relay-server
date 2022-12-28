"use strict";
// copy-🍝 from https://github.com/MasterKale/SimpleWebAuthn/blob/33528afe001d4aca62052dce204c0398c3127ffd/packages/server/src/helpers/convertCertBufferToPEM.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCertBufferToPEM = void 0;
const base64url_1 = __importDefault(require("base64url"));
/**
 * Convert buffer to an OpenSSL-compatible PEM text format.
 */
function convertCertBufferToPEM(certBuffer) {
    let b64cert;
    /**
     * Get certBuffer to a base64 representation
     */
    if (typeof certBuffer === "string") {
        b64cert = base64url_1.default.toBase64(certBuffer);
    }
    else {
        b64cert = certBuffer.toString("base64");
    }
    let PEMKey = "";
    for (let i = 0; i < Math.ceil(b64cert.length / 64); i += 1) {
        const start = 64 * i;
        PEMKey += `${b64cert.substr(start, 64)}\n`;
    }
    PEMKey = `-----BEGIN CERTIFICATE-----\n${PEMKey}-----END CERTIFICATE-----\n`;
    return PEMKey;
}
exports.convertCertBufferToPEM = convertCertBufferToPEM;
//# sourceMappingURL=convertCertBufferToPEM.js.map