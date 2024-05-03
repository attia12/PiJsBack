import OpenAI from 'openai';

export interface IChatRequest {
  messages: OpenAI.Chat.ChatCompletionMessage[];
  stream?: boolean;
}

export interface IChatResponse {
  success: boolean;
  result: OpenAI.ChatCompletion.Choice;
}