import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Evaluation } from "src/schemas/evaluation.schema";

@Injectable()
export class EvaluationService{
    constructor(
        @InjectModel(Evaluation.name)
        private EvaluationModel : mongoose.Model<Evaluation>
    ){}

    async findAll(): Promise<Evaluation[]> {
        const  evaluations = await this.EvaluationModel.find()
        return evaluations;
    }
    async create(evaluation: Evaluation): Promise<Evaluation> {
        const  newEvaluation = await this.EvaluationModel.create(evaluation);
        return  newEvaluation;
    }
     async findById(id: string): Promise<Evaluation> {
        const  newEvaluation = await this.EvaluationModel.findById(id);
        if(!newEvaluation){
                throw new NotFoundException('This evaluation does not exist');
        }
        return  newEvaluation;
    }
    
    async updateById(id: string,updateEvaluation:Evaluation): Promise<Evaluation> {
        return await this.EvaluationModel.findByIdAndUpdate(id,updateEvaluation,{
            new:true,
            runValidators:true
        });
       
    }
    async deleteById(id: string): Promise<Evaluation> {
        return await this.EvaluationModel.findByIdAndDelete(id);
       
    }
}