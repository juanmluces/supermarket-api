import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRegister({ email, apiKey }: { email: string; apiKey: string }) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Supermarket API',
      template: './welcome',
      context: {
        email,
        apiKey
      }
    });
  }
}
