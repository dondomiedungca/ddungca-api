import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async create(createMailDto: CreateMailDto) {
    const { MAIL_TO } = this.configService.get('MAIL_SETTINGS');

    try {
      await this.mailerService.sendMail({
        to: MAIL_TO,
        from: `"Portfolio Inquire" <${createMailDto.email}>`,
        subject: `Inquire From ${createMailDto.name}`,
        template: './portfolio',
        context: {
          name: createMailDto.name,
          email: createMailDto.email,
          message: createMailDto.message,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
