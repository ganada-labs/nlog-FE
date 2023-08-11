import { NextApiRequest, NextApiResponse } from "next";

const PROVIDER_MAP = {
  google: "google",
};

type Provider = keyof typeof PROVIDER_MAP;

const isProvider = (value: string): value is Provider => {
  return Object.values(PROVIDER_MAP).includes(value);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const { provider } = query;

  if (!provider || Array.isArray(provider) || !isProvider(provider)) {
    res.status(400).json({ error: "Not a supported provider" });
    res.end();
  }

  res.writeHead(302, { Location: `https://api.new-blog.store/auth/${provider}` });
  res.end();
}
