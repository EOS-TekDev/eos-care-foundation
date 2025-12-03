"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreApi = exports.snap = void 0;
const midtrans_client_1 = __importDefault(require("midtrans-client"));
const env_1 = require("./env");
exports.snap = new midtrans_client_1.default.Snap({
    isProduction: env_1.env.midtransIsProduction,
    serverKey: env_1.env.midtransServerKey,
    clientKey: env_1.env.midtransClientKey,
});
exports.coreApi = new midtrans_client_1.default.CoreApi({
    isProduction: env_1.env.midtransIsProduction,
    serverKey: env_1.env.midtransServerKey,
    clientKey: env_1.env.midtransClientKey,
});
//# sourceMappingURL=midtrans.js.map