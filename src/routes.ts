let express = require( "express")
let recieveCtrl = require("./controllers/recieveCtrl")
export const router = express.Router();


router.get('/', (req:any, res:any) => {
    res.send('Hello World!')
    console.log('Hello world!!');
  })
  
router.post('/recieve', recieveCtrl.recieveCtrl)

module.exports = router;
