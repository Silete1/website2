import { complete } from './decapHandlers.js';

export default async function handler(req, res) {
  return complete(req, res);
}
