/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { ContractModule } from './contract/contract.module';
import { LettreDeMotivationModule } from './lettre-de-motivation/lettre-de-motivation.module';
import { MeetingModule } from './meeting/meeting.module';





@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/pi'),UserModule, ContractModule, LettreDeMotivationModule, MeetingModule],
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
