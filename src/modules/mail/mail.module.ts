import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAIL_FROM } =
          configService.get('MAIL_SETTINGS');

        return {
          transport: {
            host: MAIL_HOST,
            port: MAIL_PORT as unknown as number,
            ignoreTLS: true,
            secure: false,
            auth: {
              user: MAIL_USER,
              pass: MAIL_PASSWORD,
            },
          },
          defaults: {
            from: MAIL_FROM,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
