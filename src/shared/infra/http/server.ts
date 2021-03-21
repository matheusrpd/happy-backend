import 'reflect-metadata';
import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/container';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { isCelebrateError } from 'celebrate';
import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import ValidationError from '@shared/errors/ValidationError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.updloadFolder));
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    if (isCelebrateError(error)) {
      console.error(error);

      const errorBody = error.details.get('body'); 
      const errors: String[] = [];

      errorBody!.details.forEach(errorItem => {        
        const error = new ValidationError({
          value: errorItem.path[0],
          type: errorItem.type,
          message: errorItem.message
        });

        errors.push(error.message);
      });

      return response.status(400).json({
        status: 'error',
        errors
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started!');
});