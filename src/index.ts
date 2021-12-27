let express = require( "express")
let router = require('./routes');
const basicAuth = require('express-basic-auth')

const momosApp = express()
const port = 3000

momosApp.use(express.json());

momosApp.use(function (err:any, req:any, res:any, next:any) {
  console.error("came here " + err.stack)
  res.status(500).send('Something broke!')
})

momosApp.use(basicAuth({
  users: { 'admin': 'supersecret' },
  unauthorizedResponse: (req:any) => {
    return `unauthorized. ip: ${req.ip}`
  }
}))


momosApp.use('/momos', router);

  momosApp.listen(port, () => {
  console.log(`Example momosApp listening at http://localhost:${port}`)
})