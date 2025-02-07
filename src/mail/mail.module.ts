import { Module } from '@nestjs/common';
import { MailService } from './service/mail.service';

@Module({
    providers: [MailService]
})
export class MailModule {}
