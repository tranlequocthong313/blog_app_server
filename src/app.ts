import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import router from './components/routes';
import { notFound, responseErrors } from './middleware/error.middleware';

const app = express();

app
    .use(helmet())
    .use(morgan('dev'))
    .use(cors())
    .use(express.json())

    .use('/api', router)

    .use(notFound)
    .use(responseErrors);

export default app;
