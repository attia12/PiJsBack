import { IsNotEmpty, IsString } from "class-validator";

export class GetChatCompletionAnswerInputDto{
    @IsString()
    @IsNotEmpty()
    message: any;

}
export class GetChatCompletionAnswerOutputDto{
    @IsString()
    @IsNotEmpty()
    aiMessage: any;
    static getInstance(aiMessage: any){
        const result= new GetChatCompletionAnswerOutputDto();
        result.aiMessage=aiMessage;
        return result;
    }
}
