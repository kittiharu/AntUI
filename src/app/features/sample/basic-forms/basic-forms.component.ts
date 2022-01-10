import { Component, OnInit } from '@angular/core';
import { MessageService } from '@core/services';
import { SampleService } from '../sample.service';

@Component({
  selector: 'app-basic-forms',
  templateUrl: './basic-forms.component.html',
  styleUrls: ['./basic-forms.component.css']
})
export class BasicFormsComponent implements OnInit {

  constructor(private messageService: MessageService,
    private sampleService: SampleService) { }

  searchResult: any = {
    data: [
      {
        name: 'Kitti Haruetaisodsai',
        creationDate: '2021-09-19',
        status: 'Active'
      },{
        name: 'Kitti Haruetaisodsai',
        creationDate: '2021-09-19',
        status: 'Active'
      },{
        name: 'Kitti Haruetaisodsai',
        creationDate: '2021-09-19',
        status: 'Active'
      }]
  }

  showSearch = true
  toggleLabel = 'Hide'

  ngOnInit(): void {
    console.log('Basic Forms OnInit');
  }

  onBack(): void{}

  onSearch(): void {
    this.sampleService.searchBasicForm().subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err.error);
    });
    this.messageService.success('Search Successfully', 'This is content');
  }

  // toggleCollapse(): void {
  //   this.showSearch = !this.showSearch;
  //   this.controlArray.forEach((c, index) => {
  //     c.show = this.isCollapse ? index < 6 : true;
  //   });
  // }

}
