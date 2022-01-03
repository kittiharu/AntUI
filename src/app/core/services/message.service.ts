import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Message, MessageType } from '../models/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private subject = new Subject<Message>();
    private defaultId = 'default-noti';
    private duration = 5000;

    constructor (private notification: NzNotificationService){}

    onMessage(id = this.defaultId): Observable<Message> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    send(message: Message) {
        //message.id = message.id || this.defaultId;
        //this.subject.next(message);
        let type = 'info'
        switch(message.type) {
            case MessageType.Success:
                type = 'success';
                break;
            case MessageType.Warning:
                type = 'warning';
                break;
            case MessageType.Error:
                type = 'error';
                break;
        }
        let duration = message.autoClose === false ? 0 : this.duration;
        this.notification.create(
            type,
            message.title,
            message.content,
            {nzDuration: duration}
        )
    }

    clear(id = this.defaultId) {
        //this.subject.next(new Message({ id }));
        this.notification.remove(id);
    }

    success(title: string, content = '', autoClose = true) {
        this.send(new Message({ type: MessageType.Success, title: title, content: content, autoClose: true }));
    }

    error(title: string, content = '', autoClose = true) {
        this.send(new Message({ type: MessageType.Error, title: title, content: content, autoClose: true }));
    }

    info(title: string, content = '', autoClose = true) {
        this.send(new Message({ type: MessageType.Info, title: title, content: content, autoClose: true }));
    }

    warn(title: string, content = '', autoClose = true) {
        this.send(new Message({ type: MessageType.Warning, title: title, content: content, autoClose: true }));
    }
}