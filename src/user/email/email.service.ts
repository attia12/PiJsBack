/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, body: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text: body,
    });
  }
  async sendOTPByEmail(to: string, otp: number): Promise<void> {
    const subject = 'Forgot Password OTP';
    const body = `Your OTP for password reset is: ${otp}`;
    await this.sendEmail(to, subject, body);
}
}
