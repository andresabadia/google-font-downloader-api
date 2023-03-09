import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FontController } from './font.controller';
import { FontService } from './font.service';

@Module({
  imports: [HttpModule],
  controllers: [FontController],
  providers: [FontService],
})
export class FontModule {}
