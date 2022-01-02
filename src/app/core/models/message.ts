export class Message {
    id: string;
    type: MessageType;
    title: string;
    content: string;
    autoClose: boolean;

    constructor(init?:Partial<Message>) {
        Object.assign(this, init);
    }
}

export enum MessageType {
    Success,
    Error,
    Info,
    Warning
}