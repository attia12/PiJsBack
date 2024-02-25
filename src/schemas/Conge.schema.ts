import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import mongoose, { Document } from "mongoose";
import { StatutCon } from "../conge/statut-con.enum";
import { TypeCon } from "../conge/type-con.enum";

export type CongeDocument = Conge & Document

@Schema()
export class Conge{
    @Prop()
    id: number;
    @Prop({default:Date.now})
    date_deb: Date;
    @Prop()
    date_fin: Date;
    @Prop()
    jours_restants: number;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StatutCon' })
  statutCon: StatutCon;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TypeCon' })
  typeCon: TypeCon;

    
}



export const CongeSchema = SchemaFactory.createForClass(Conge)  

function isStatutCon(value: any): value is StatutCon {
  return StatutCon.hasOwnProperty(value);
}

function isTypeCon(value: any): value is TypeCon {
  return TypeCon.hasOwnProperty(value);
}

