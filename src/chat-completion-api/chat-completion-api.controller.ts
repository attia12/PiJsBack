import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ChatCompletionApiService } from './chat-completion-api.service';
import { GetChatCompletionAnswerInputDto } from './dto/chat-completion-answer.dto';

@Controller('chat-completion-api')
export class ChatCompletionApiController {
    constructor(private readonly service:ChatCompletionApiService){
       
    }
    @Post()
    getChatCompletionMessage(@Body(new ValidationPipe({transform:true})) data:GetChatCompletionAnswerInputDto){
       return this.service.getAiModelAnswer(data);
    }
}
