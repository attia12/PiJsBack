/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AtStrategy } from 'src/strategies/at.strategy';
import { RtStrategy } from 'src/strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserSeedService } from 'src/seed/UserSeedService';

@Module({
    imports: [MongooseModule.forFeature([
        { name: User.name,
            schema : UserSchema

        },

    ]),JwtModule.register({})],
    providers: [UserService,AtStrategy,RtStrategy,UserSeedService],
    controllers: [UserController]
})
export class UserModule {
    constructor(private readonly userSeederService: UserSeedService) {
        this.seedData();
    
      }
      async seedData() {
        await this.userSeederService.seedUsers();
      }
}
