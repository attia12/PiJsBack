import { from } from "form-data";
import{
    HumanMessage,AIMessage,SystemMessage,BaseMessage
}
from 'langchain/schema';
export class ChatHistoryManager{
    readonly chatHistory=[];
    constructor(systemMessage?: string){
        this.chatHistory=[];
        if(systemMessage){
            this.addSystemMessage(systemMessage);
        
        }
    }
   private addSystemMessage(message: string) {
       this.chatHistory.push(new SystemMessage(message));
    }
    addAiMessage(message:any){
        this.chatHistory.push(new AIMessage(message));
    }
    addHumanMessage(message:string){
        this.chatHistory.push(new HumanMessage(message));
    }
}