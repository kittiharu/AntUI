import { AuthorizationService } from './authorization.service';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

export const services: any[] = [AuthorizationService, LoadingService, MessageService];

export * from './authorization.service';
export * from './loading.service';
export * from './message.service';