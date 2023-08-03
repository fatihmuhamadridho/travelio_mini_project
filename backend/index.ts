require('dotenv').config()
import { default as express } from 'express';
import { default as bodyParser } from 'body-parser';
import { default as cors } from 'cors';
import { wishlistRouter } from './src/routes/wishlist.router';
import { resetRouter } from './src/routes/reset.router';

const PORT = process.env.PORT || 4000;
const app = express();

const corsOptions = { origin: '*', optionsSuccessStatus: 200 };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use([wishlistRouter, resetRouter])

app.use('/', (req: any, res: any) => {
  res.status(500).json({
    code: res.statusCode,
    status: false,
    message: 'Your endpoint is incorrect, please recheck abaout your endpoint..',
    env: process.env.NODE_ENV
  });
});

app.listen(PORT, () => {
  console.log(`Server is successfully running on port http://localhost:${PORT}`);
});

export default app;
