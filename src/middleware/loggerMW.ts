export const loggerMW = (req:any, res:any, next:any) => {
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `LoggerMW: [${new Date().toISOString()}] ${method}:${url} ${status}`;
    console.log(log);
    next();
  };