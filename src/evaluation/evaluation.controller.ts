import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EvaluationService } from "./evaluation.service";
import { Evaluation } from "src/schemas/evaluation.schema";
import { CreateEvaluationDto } from "src/dto/create-evaluation.dto";
import { UpdateEvaluationDto } from "src/dto/update-evaluation.dto";

@Controller('evaluation')
export class EvaluationController{
    constructor(private evaluationService : EvaluationService){}
    @Post('addEvaluation')
    addEvaluation(@Body() evaluation: CreateEvaluationDto): Promise<Evaluation> {
        return  this.evaluationService.create(evaluation)

    }
    @Get('getAllEvaluations')
    getAllEvaluations() : Promise<Evaluation[]> {
        return  this.evaluationService.findAll();
    }
    @Get('getEvaluation/:id')
    getEvaluationById(@Param('id') id:string) : Promise<Evaluation> {
        return  this.evaluationService.findById(id);
    }
    @Put('updateEvaluation/:id')
    updateEvaluation(@Param('id') id:string,@Body() evaluation: UpdateEvaluationDto): Promise<Evaluation> {
        return  this.evaluationService.updateById(id , evaluation ) ;
    }

    @Delete('deleteEvaluation/:id')
    deleteEvaluationById(@Param('id') id:string) : Promise<Evaluation> {
        return  this.evaluationService.deleteById(id);
    }
}