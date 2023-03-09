import { Controller, Get } from '@nestjs/common';
import { FontService } from './font.service';
import { GoogleFontList } from './models/GoogleFontList';

@Controller()
export class FontController {
  constructor(private readonly fontService: FontService) {}

  @Get('fonts')
  async getFonts(): Promise<GoogleFontList> {
    return this.fontService.getFonts();
  }
}
