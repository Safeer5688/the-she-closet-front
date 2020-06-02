import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plag-checker',
  templateUrl: './plag-checker.component.html',
  styleUrls: ['./plag-checker.component.css']
})
export class PlagCheckerComponent implements OnInit {
  url1: any;
  url2:any;
  constructor() {
    if (!this.url1) {
      this.url1 = "https://i.pinimg.com/originals/92/3c/50/923c508dac22439e4f56502f7181e040.jpg";
      this.url2 = "https://i.pinimg.com/originals/92/3c/50/923c508dac22439e4f56502f7181e040.jpg";
    }
  }

  onSelectFile1(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url1 = event.target.result;
        console.log( event.target.result);
      }
    }
  }

  onSelectFile2(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url2 = event.target.result;
        console.log( event.target.result);
      }
    }
  }

  ngOnInit() {
  }

}
