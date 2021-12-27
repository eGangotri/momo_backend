import { errorMW } from './middleware/errorMW';
import { loggerMW } from './middleware/loggerMW';
import { authMW } from './middleware/authMW';

let express = require('express');
let router = require('./routes');

const momosApp = express();
const port = process.env.PORT || 4000;

momosApp.use(express.json());
momosApp.use(loggerMW);
//momosApp.use(authMW);

momosApp.use('/momos', router);
momosApp.use(errorMW)

momosApp.listen(port, () => {
  console.log(`Example momosApp listening at http://localhost:${port}`);
});
