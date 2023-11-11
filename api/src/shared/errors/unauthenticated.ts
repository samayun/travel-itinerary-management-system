import { Response } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';

@Catch(UnauthorizedException) // Catch UnauthorizedException thrown by the guard
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    // Handle the exception and send a custom response
    response.status(401).json({
      message: 'Authentication failed',
      error: exception.message, // You can include additional error details
    });
  }
}
