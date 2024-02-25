/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { CongeModule } from './conge/conge.module';





@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/pi'),
  UserModule,
  CongeModule
],
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
