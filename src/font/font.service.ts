import { HttpService } from '@nestjs/axios/dist';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { GoogleFontList } from './models/GoogleFontList';

@Injectable()
export class FontService {
  private readonly logger = new Logger(FontService.name);
  constructor(private readonly httpService: HttpService) {}
  async getFonts(): Promise<GoogleFontList> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<GoogleFontList>(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.API_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
