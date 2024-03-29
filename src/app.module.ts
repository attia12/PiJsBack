/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule } from '@nestjs/cache-manager';
import { ChatModule } from './chat/chat.module';






@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/pi'),UserModule,CacheModule.register(
    {
      ttl:10,
      max:100000,
      isGlobal:true,
    }
  ),
MailerModule.forRoot({
  transport: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'attia1232020@gmail.com',
      pass: 'iazrrhplbjawynai',
    },
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
}),
ChatModule],
  controllers: [],
  providers: [
    {
      provide:APP_GUARD,
      useClass:AtGuard
    },
     
  ],
})
export class AppModule {
  
}
