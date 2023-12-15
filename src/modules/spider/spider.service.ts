import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';
@Injectable()
export class SpiderService {
  async findAll() {
    const getCosPlay = async () => {
      const body = await axios
        .get(
          'https://2t6y.mydown.com/yuanqidesktop/tj.html?softid=585&tid1=133&tid2=1001&tod1=6856&bd_vid=10827495977203787896',
        )
        .then((res) => res.data);
      const $ = cheerio.load(body);
      $('.middle-content').each(function () {
        console.log($(this).attr('div'));
      });
    };
    getCosPlay();
    return 'aa';
  }
}
