import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "./User.schema";



@Schema({
    timestamps: true
})
export class TimeEntry{
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    // employee:User
    @Prop()
    employee:string
    @Prop()
    date:Date
    @Prop()
    tempsDeTravail:string
    @Prop()
    status:string
    @Prop()
    justification:string

}
export const TimeEntrySchema = SchemaFactory.createForClass(TimeEntry)
