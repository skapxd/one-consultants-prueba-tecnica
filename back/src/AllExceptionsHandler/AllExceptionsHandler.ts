import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import fetchToCurl from 'fetch-to-curl';

@Catch()
export class AllExceptionsHandler extends BaseExceptionFilter {
  constructor(
    @Inject(HttpAdapterHost) applicationRef: HttpServer,
    private readonly logger: Logger,
  ) {
    super(applicationRef);
  }

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { url, method, headers, body } = request;

    try {
      const status =
        exception instanceof HttpException ? exception.getStatus() : 500;
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : exception.message;

      const log = {
        status,
        cURL: fetchToCurl(`http://localhost:${process.env.PORT}${url}`, {
          body,
          headers,
          method,
        }),
        headers,
        body,
        url,
        method,
        errorMessage: message,
      };

      this.logger.error(log);

      return response.status(status).json(log);
    } catch (error) {
      return response
        .status(500)
        .json(new InternalServerErrorException(error.message).getResponse());
    }
  }
}
