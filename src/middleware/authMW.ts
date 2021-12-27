const basicAuth = require('express-basic-auth');

export const authMW = 
basicAuth({
  users: { admin: 'supersecret' },
  unauthorizedResponse: (req: any) => {
    return `unauthorized. ip: ${req.ip}`;
  }
})