import { Injectable } from "@angular/core";
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    subject = new Subject<boolean>()
    stackEvent = 0

   constructor() {
   }
   
   getLoadingSubject(){
       return this.subject
   }
   
   trigger(loading: boolean){
    if(loading){
        this.stackEvent++
    }else {
        this.stackEvent--
    }
    this.subject.next(loading)
   }

   getStackEvent(){
       return this.stackEvent
   }
}