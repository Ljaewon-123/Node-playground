"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecret = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const createSecretsManagerClient = (region) => new client_secrets_manager_1.SecretsManagerClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});
const fetchSecretValue = (client) => (secretId) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_secrets_manager_1.GetSecretValueCommand({ SecretId: secretId });
    const response = yield client.send(command);
    return response.SecretString;
});
// const parseSecret = (secretString?: string) => JSON.parse(secretString);
const getParsedSecret = (region, secretId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = createSecretsManagerClient(region);
    const secretString = yield fetchSecretValue(client)(secretId);
    // return parseSecret(secretString);
    return secretString;
    secretString;
});
const getSecret = () => __awaiter(void 0, void 0, void 0, function* () {
    const region = "ap-northeast-2";
    const secretId = "auto-secretsmanager-2";
    const secret = yield getParsedSecret(region, secretId);
    console.log(secret);
});
exports.getSecret = getSecret;
// (async () => {
//   const region = "ap-northeast-2";
//   const secretId = "auto-secretsmanager-2";
//   const secret = await getParsedSecret(region, secretId);
//   console.log(secret);
// })();
