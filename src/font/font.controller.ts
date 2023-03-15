import { Controller, Get, Query } from '@nestjs/common';
import { FontService } from './font.service';
import { GoogleFontList } from './models/GoogleFontList';

@Controller()
export class FontController {
  constructor(private readonly fontService: FontService) {}

  @Get('font')
  async getFont(@Query('family') family: string | string[]) {
    let font = '';
    if (Array.isArray(family)) {
      font = family.join('&family=');
    } else if (family) {
      font = family;
    } else {
      return 'Missing font family';
    }

    return this.fontService.getFont(font);
  }

  @Get('fonts')
  async getFonts(): Promise<GoogleFontList> {
    return this.fontService.getFonts();
  }
}
