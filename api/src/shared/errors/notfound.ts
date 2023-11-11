import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class HttpExceptionFilter<T extends NotFoundException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log({ e: exception.getResponse() });
    return host
      .switchToHttp()
      .getResponse()
      .status(exception.getStatus())
      .send({
        statusCode: exception.getStatus(),
        ...(exception.getResponse() as object),
      });
  }
}
