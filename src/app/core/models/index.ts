import { Message, MessageType } from './message';
import { Token } from './token';

export const services: any[] = [Message, MessageType, Token];

export * from './message';
export * from './token';