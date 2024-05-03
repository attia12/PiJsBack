/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { ContractModule } from './contract/contract.module';
import { LettreDeMotivationModule } from './lettre-de-motivation/lettre-de-motivation.module';
import { MeetingModule } from './meeting/meeting.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule } from '@nestjs/cache-manager';
import { ChatModule } from './chat/chat.module';
import { EvaluationModule } from './evaluation/evaluation.module';

import { TimeEntryModule } from './timeEntry/timeEntry.module';
import { SentryInterceptor } from './interceptors/sentry/sentry.interceptor';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { ChatCompletionApiModule } from './chat-completion-api/chat-completion-api.module';
import { KnnService } from './knn/knn.service';
import { KnnController } from './knn/knn.controller';







@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/pi'),UserModule, ContractModule, LettreDeMotivationModule, EvaluationModule,TimeEntryModule,MeetingModule,CacheModule.register(
    {
      ttl:10,
      max:100000,
      isGlobal:true,
    }
  ),
  ConfigModule.forRoot({
    isGlobal: true, // Make ConfigModule available globally
  }),
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
EventEmitterModule.forRoot(),
ChatCompletionApiModule],
  controllers: [KnnController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
    KnnService,
  ],
})
export class AppModule {
  
}
