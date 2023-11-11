import { Response } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException) // Catch UnauthorizedException thrown by the guard
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    // Handle the exception and send a custom response
    response.status(405).json({
      message: 'Process failed',
      error: exception.message,
    });
  }
}
