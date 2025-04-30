import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

const createSecretsManagerClient = (region: string) => new SecretsManagerClient({
  region: process.env.REGION as any,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as any,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as any,
  },
});

const fetchSecretValue = (client: SecretsManagerClient) => async (secretId: string) => {
  const command = new GetSecretValueCommand({ SecretId: secretId });
  const response = await client.send(command);
  return response.SecretString;
};

// const parseSecret = (secretString?: string) => JSON.parse(secretString);

const getParsedSecret = async (region: string, secretId: string) => {
  const client = createSecretsManagerClient(region);
  const secretString = await fetchSecretValue(client)(secretId);
  // return parseSecret(secretString);
  return secretString;secretString
};


const getSecret = async () => {
  const region = "ap-northeast-2";
  const secretId = "auto-secretsmanager-2";

  const secret = await getParsedSecret(region, secretId);
  console.log(secret);
}

export { getSecret };
// (async () => {
//   const region = "ap-northeast-2";
//   const secretId = "auto-secretsmanager-2";

//   const secret = await getParsedSecret(region, secretId);
//   console.log(secret);
// })();
