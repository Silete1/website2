import { begin } from './decapHandlers.js';

export default async function handler(req, res) {
  return begin(req, res);
}
