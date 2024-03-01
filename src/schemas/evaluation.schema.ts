import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})
export class Evaluation{

    @Prop()
    commentaire:string
    @Prop()
    note: number


}
export const EvaluationSchema = SchemaFactory.createForClass(Evaluation)
