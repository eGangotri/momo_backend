let express = require( "express")
let momosCtrl = require("./controllers/momosCtrl")
export const router = express.Router();


router.get('/', (req:any, res:any) => {
    res.send('Hello World!')
    console.log('Hello world!!');
  })
  
router.post('/scrape', momosCtrl.scrapeCtrl);

router.get('/retrieve', momosCtrl.retrieveCtrl);

module.exports = router;
