import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private loadingService: LoadingService) { 
    this.loadingService.getLoadingSubject().subscribe(loading => {
      if(loading){
          this.isLoading = loading   
      }else {
          if(this.loadingService.getStackEvent() == 0){       // load last response, not best way
              this.isLoading = loading
          }
      }
  })
  }

  ngOnInit(): void {
  }

  isLoading: boolean;

}
