const basicAuth = require('express-basic-auth');

//http://admin:supersecret@localhost:4000/momos/scrape

//http://admin:supersecret@localhost:4000/momos/retrieve
export const authMW = 
basicAuth({
  users: { admin: 'supersecret' },
  unauthorizedResponse: (req: any) => {
    return `unauthorized. ip: ${req.ip}`;
  }
})