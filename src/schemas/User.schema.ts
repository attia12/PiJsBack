/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Room } from "./Room.schema";
import mongoose from "mongoose";
import { Evaluation } from "./evaluation.schema";
import { TimeEntry } from "./timeEntry.schema";




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
   @Prop({ type: [{ type: 'ObjectId', ref: 'Room' }] }) 
    rooms: Room[]; 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation' })
  evaluations: Evaluation[] | string[];
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'TimeEntry' }) // Array of TimeEntry IDs
  timeEntries: TimeEntry[] ; 
}
export const UserSchema = SchemaFactory.createForClass(User);