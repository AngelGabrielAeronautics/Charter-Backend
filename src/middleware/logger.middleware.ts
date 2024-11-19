import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        // console.log('Request...');

        // const { body, method, originalUrl, params, headers} = req;
        // console.log(method);

        // if(method !== 'GET'){
        //     console.log('Should Log');
        // }
        // else{
        //     console.log('Will not log')
        // }
        next();
    }
}
