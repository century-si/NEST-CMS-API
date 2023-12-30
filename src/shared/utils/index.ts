import { Request } from 'express';
import * as requestIp from 'request-ip';

export const getReqMainInfo = (req: Request) => {
  const { query, headers, url, method, body } = req;
  const ip = requestIp.getClientIp(req);

  return JSON.stringify({
    url,
    host: headers.host,
    ip,
    method,
    query,
    body,
  });
};
