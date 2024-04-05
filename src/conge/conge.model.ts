import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum StatutCon {
  ENATTENTE = "EnAttente",
  VALIDE = "Valide",
  REFUSE = "Refuse",
}

export enum TypeCon {
  CONGESPAYES = "CongePayes",
  RTT = "Rtt",
  MALADIE = "Maladie",
}

@Schema()
export class Conge {
  @Prop()
  id: number;

  @Prop({ default: Date.now })
  date_deb: Date;

  @Prop()
  date_fin: Date;

  @Prop()
  jours_restants: number;

  @Prop()
  statutCon: StatutCon;

  @Prop()
  typeCon: TypeCon;
}

export type CongeDocument = Conge & Document;

export const CongeSchema = SchemaFactory.createForClass(Conge);