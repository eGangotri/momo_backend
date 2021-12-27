let express = require("express");
import { router } from './routes';
const momosApp = express();
const port = 3000;
momosApp.use(express.json());
momosApp.use(function (err, req, res, next) {
    console.error("came here " + err.stack);
    res.status(500).send('Something broke!');
});
momosApp.use('/momos', router);
momosApp.listen(port, () => {
    console.log(`Example momosApp listening at http://localhost:${port}`);
});
