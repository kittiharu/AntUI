import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-forms',
  templateUrl: './basic-forms.component.html',
  styleUrls: ['./basic-forms.component.css']
})
export class BasicFormsComponent implements OnInit {

  constructor() { }

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

  ngOnInit(): void {
  }

  onBack(): void{}

}
