export type ChatMessage = {
    text: string;
    sender: 'user' | 'bot';
    type: 'text' | 'element-select';
    options?: string[];
  };