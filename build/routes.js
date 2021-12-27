let express = require("express");
export const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World!');
    console.log('Hello world!!');
});
router.post('/recieve', (req, res, next) => {
    const data = req.body.data;
    try {
        throw new Error('BROKEN');
    }
    catch (err) {
        next(err);
    }
    console.log(data.y + 1);
    console.log(`recieve ${JSON.stringify(data)}`);
    res.send('recieve request to the homepage');
});
