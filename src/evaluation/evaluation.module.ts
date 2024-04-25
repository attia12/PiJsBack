import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Evaluation, EvaluationSchema } from "src/schemas/evaluation.schema";
import { EvaluationController } from "./evaluation.controller";
import { EvaluationService } from "./evaluation.service";


@Module({
    imports:[MongooseModule.forFeature([{name : 'Evaluation', schema : EvaluationSchema}])],
    controllers:[EvaluationController],
    providers:[EvaluationService]

})
export class EvaluationModule{
    
}