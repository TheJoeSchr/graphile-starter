import { Express } from "express";

export default async function installSSR(_app: Express) {
  /* Nuxt takes care of SSR for us, we don't need to handle it here */
  return;
}
