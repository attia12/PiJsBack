import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Conge, CongeSchema } from '../schemas/Conge.schema';

@Module({imports: [MongooseModule.forFeature([
    {name: Conge.name,schema:CongeSchema}
])],
providers:[],
})
export class CongeModule {}
