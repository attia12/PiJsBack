/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { ContractModule } from './contract/contract.module';
import { LettreDeMotivationModule } from './lettre-de-motivation/lettre-de-motivation.module';
import { MeetingModule } from './meeting/meeting.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule } from '@nestjs/cache-manager';
import { ChatModule } from './chat/chat.module';
import { CongeModule } from './conge/conge.module';






@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/pi'),UserModule, ContractModule, LettreDeMotivationModule, MeetingModule,CongeModule,CacheModule.register(
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
ChatModule,
CongeModule],
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
