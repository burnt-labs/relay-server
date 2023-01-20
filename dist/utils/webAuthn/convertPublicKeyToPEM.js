"use strict";
// copy-🍝 from https://github.com/MasterKale/SimpleWebAuthn/blob/33528afe001d4aca62052dce204c0398c3127ffd/packages/server/src/helpers/convertPublicKeyToPEM.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPublicKeyToPEM = void 0;
const cbor_1 = __importDefault(require("cbor"));
const jwk_to_pem_1 = __importDefault(require("jwk-to-pem"));
const convertCOSEtoPKCS_1 = require("./convertCOSEtoPKCS");
function convertPublicKeyToPEM(publicKey) {
    let struct;
    try {
        struct = cbor_1.default.decodeAllSync(publicKey)[0];
    }
    catch (err) {
        const _err = err;
        throw new Error(`Error decoding public key while converting to PEM: ${_err.message}`);
    }
    const kty = struct.get(convertCOSEtoPKCS_1.COSEKEYS.kty);
    if (!kty) {
        throw new Error("Public key was missing kty");
    }
    if (kty === convertCOSEtoPKCS_1.COSEKTY.EC2) {
        const crv = struct.get(convertCOSEtoPKCS_1.COSEKEYS.crv);
        const x = struct.get(convertCOSEtoPKCS_1.COSEKEYS.x);
        const y = struct.get(convertCOSEtoPKCS_1.COSEKEYS.y);
        if (!crv) {
            throw new Error("Public key was missing crv (EC2)");
        }
        if (!x) {
            throw new Error("Public key was missing x (EC2)");
        }
        if (!y) {
            throw new Error("Public key was missing y (EC2)");
        }
        const ecPEM = (0, jwk_to_pem_1.default)({
            kty: "EC",
            // Specify curve as "P-256" from "p256"
            crv: convertCOSEtoPKCS_1.COSECRV[crv].replace("p", "P-"),
            x: x.toString("base64"),
            y: y.toString("base64"),
        });
        return ecPEM;
    }
    else if (kty === convertCOSEtoPKCS_1.COSEKTY.RSA) {
        const n = struct.get(convertCOSEtoPKCS_1.COSEKEYS.n);
        const e = struct.get(convertCOSEtoPKCS_1.COSEKEYS.e);
        if (!n) {
            throw new Error("Public key was missing n (RSA)");
        }
        if (!e) {
            throw new Error("Public key was missing e (RSA)");
        }
        const rsaPEM = (0, jwk_to_pem_1.default)({
            kty: "RSA",
            n: n.toString("base64"),
            e: e.toString("base64"),
        });
        return rsaPEM;
    }
    throw new Error(`Could not convert public key type ${kty} to PEM`);
}
exports.convertPublicKeyToPEM = convertPublicKeyToPEM;
//# sourceMappingURL=convertPublicKeyToPEM.js.map