import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';
import { AppLoggerSevice } from '@/shared/logger/logger.service';

@Injectable()
export class TransformResultInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerSevice) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    // 在请求进入控制器之前，对请求数据进行处理
    if (request.body) {
      this.trimStrings(request.body);
    }

    return next.handle().pipe(
      map((data) => {
        // 在请求返回之前，对返回数据进行处理
        const result = {
          data,
          status: 200,
          message: '请求成功',
          success: true,
        };
        // 记录日志
        this.logger.setContext(context.getClass().name);
        this.logger.log(JSON.stringify(result));
        return result;
      }),
    );
  }

  private trimStrings(data: any): any {
    if (data instanceof Object) {
      // 递归遍历对象，去掉字符串两端的空格
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'string') {
          if (data[key].trim() == '') {
            data[key] = null;
          }
        } else if (data[key] instanceof Object) {
          this.trimStrings(data[key]);
        }
      });
    }
  }
}
