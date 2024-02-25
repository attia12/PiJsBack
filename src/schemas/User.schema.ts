/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




@Schema()
export class User {

    @Prop({ unique: true, required: true })
    username: string;
  
    @Prop({ 
        trim: true,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Valid email required"], })
   email: string;
   @Prop({ unique: true, required: true })
   password: string;
   @Prop({ required: false })
   hash?: string;
   @Prop({ required: false })
   hashedRt?: string;
   @Prop({ required: true, default: 'employee' }) 
   roles: string[];

   @Prop({ required: true, default: [] }) 
   permissions: string[];
   @Prop({ required: true, default: 'default_image.jpg' }) 
   image: string;


}
export const UserSchema = SchemaFactory.createForClass(User);