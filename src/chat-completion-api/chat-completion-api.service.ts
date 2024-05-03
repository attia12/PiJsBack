import { Injectable } from '@nestjs/common';
import { ChatHistoryManager } from './dto/chat-history-manager';
import{ChatOpenAI} from 'langchain/chat_models/openai'
import { GetChatCompletionAnswerInputDto, GetChatCompletionAnswerOutputDto } from './dto/chat-completion-answer.dto';
@Injectable()
export class ChatCompletionApiService {
    private readonly chatHistory:ChatHistoryManager;
    private readonly chat:ChatOpenAI;
constructor(){
    this.chatHistory = new ChatHistoryManager();
    this.chat = new ChatOpenAI({
        openAIApiKey:process.env.OPEN_API_KEY,
        model:process.env.OPEN_API_MODEL
    });

}
async getAiModelAnswer(data:GetChatCompletionAnswerInputDto){
    this.chatHistory.addHumanMessage(data.message);
    const result= await this.chat.predictMessages(
        this.chatHistory.chatHistory,
    );
    const aiMessage=result.content;
    this.chatHistory.addAiMessage(aiMessage);
    return GetChatCompletionAnswerOutputDto.getInstance(aiMessage);

}

}
