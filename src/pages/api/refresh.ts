import { nlogAPI } from "src/utils/nlog-api";

import { NextApiRequest, NextApiResponse } from "next";

const TOKEN_MAX_AGE = 3600 * 24 * 14; // 14일
export default async function refresh(req: NextApiRequest, res: NextApiResponse) {
  const refreshToken = req.cookies["refresh_token"]; // 쿠키 이름으로 읽기

  /**
   * api에 refresh 요청
   */
  const { data: newTokens } = await nlogAPI.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = newTokens;
  res.setHeader("Set-Cookie", [
    `refresh_token=${newRefreshToken}; Domain=.new-blog.store; Max-Age=${TOKEN_MAX_AGE} HttpOnly; Path=/`,
  ]);
  res.status(200).json(newAccessToken);
}
