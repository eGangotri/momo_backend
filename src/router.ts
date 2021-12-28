let express = require( "express")
let momosCtrl = require("./controllers/momosCtrl")
export const router = express.Router();


router.get('/', (req:any, res:any) => {
    res.send('Hello World!')
    console.log('Hello world!!');
  })
  
router.post('/recieve', momosCtrl.recieveCtrl);

router.get('/getData', momosCtrl.getDataCtrl);

module.exports = router;
