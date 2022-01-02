import { Component, OnInit } from '@angular/core';
import { MessageService } from '@core/services';

@Component({
  selector: 'app-basic-forms',
  templateUrl: './basic-forms.component.html',
  styleUrls: ['./basic-forms.component.css']
})
export class BasicFormsComponent implements OnInit {

  constructor(private messageService: MessageService) { }

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
  }

  onBack(): void{}

  onSearch(): void {
    this.messageService.success('Search Successfully', 'This is content');
  }

  // toggleCollapse(): void {
  //   this.showSearch = !this.showSearch;
  //   this.controlArray.forEach((c, index) => {
  //     c.show = this.isCollapse ? index < 6 : true;
  //   });
  // }

}
