import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file, 'file');

    return {
      status: 200,
      message: '上传成功',
    };
  }

  @Get('export')
  download(@Res() res) {
    const url = join(__dirname + 'modules', '../images/1702612386914.png');
    res.download(url);
  }

  @Get('stream')
  async down(@Res() res) {
    const url = join(__dirname + 'modules', '../images/1702612386914.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disponsition', `attachment; filename=xz`);

    tarStream.pipe(res);
  }
}
