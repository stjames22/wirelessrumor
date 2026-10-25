import { constants, privateDecrypt } from 'node:crypto';

// Credentials are encrypted during secure provisioning. Decrypt only in server
// memory; neither the key nor the private wrapping material is sent to clients.
export function getApiKey(): string {
  if (process.env.OPENAI_API_KEY?.trim()) return process.env.OPENAI_API_KEY.trim();
  const ciphertext = process.env.OPENAI_API_KEY_ENCRYPTED;
  const privateKey = process.env.OPENAI_KEY_WRAPPING_PRIVATE;
  if (!ciphertext || !privateKey) return '';
  return privateDecrypt({ key: Buffer.from(privateKey, 'base64').toString('utf8'), padding: constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, Buffer.from(ciphertext, 'base64url')).toString('utf8');
}
