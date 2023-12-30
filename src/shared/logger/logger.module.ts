import { Logger, Module } from '@nestjs/common';
import { AppLoggerSevice } from './logger.service';

@Module({
  controllers: [],
  providers: [AppLoggerSevice, Logger],
  exports: [AppLoggerSevice],
})
export class LoggerModule {}
