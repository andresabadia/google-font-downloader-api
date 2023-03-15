import { HttpService } from '@nestjs/axios/dist';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CSSFontFace } from './models/CSSFontFace';
import { GoogleFontList } from './models/GoogleFontList';
import { cssParser } from './utils/cssParser';

@Injectable()
export class FontService {
  private readonly logger = new Logger(FontService.name);

  private googleFontList: GoogleFontList;

  constructor(private readonly httpService: HttpService) {}
  async getFonts(): Promise<GoogleFontList> {
    // cache list for future request
    if (this.googleFontList) return this.googleFontList;

    // const URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_FONTS_API_KEY}`;
    const URL = `https://fonts.google.com/metadata/fonts`;

    const { data } = await firstValueFrom(
      this.httpService.get<GoogleFontList>(URL).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    this.googleFontList = data;
    return data;
  }

  async getFont(family: string): Promise<CSSFontFace[]> {
    // https://developers.google.com/fonts/docs/css2
    const URL = `https://fonts.googleapis.com/css2?family=${family}`;
    const { data } = await firstValueFrom(
      this.httpService
        .get<string>(URL, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 6.3; rv:39.0) Gecko/20100101 Firefox/39.0',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    // parse css data to js object
    const fonts = cssParser(data);
    return fonts;
  }
}
