import { Component, OnInit } from '@angular/core';
import { DesignGeneratorService } from 'src/app/services/design-generator.service'

@Component({
  selector: 'app-design-generator',
  templateUrl: './design-generator.component.html',
  styleUrls: ['./design-generator.component.css']
})
export class DesignGeneratorComponent implements OnInit {
  url1: any;
  url2: any;
  url3: any;
  rangeValue1: any;
  rangeValue2: any;
  rangeValue3: any;
  rangeValue4: any;
  rangeValue5: any;
  blobData: any;
  constructor(
    private designGeneratorService: DesignGeneratorService
  ) {
    if (!this.url1) {
      this.url1 = "https://i.pinimg.com/originals/92/3c/50/923c508dac22439e4f56502f7181e040.jpg";
      this.url2 = "https://i.pinimg.com/originals/92/3c/50/923c508dac22439e4f56502f7181e040.jpg";
      this.url3 = "https://i.pinimg.com/originals/92/3c/50/923c508dac22439e4f56502f7181e040.jpg";
      this.rangeValue1 = 6;
      this.rangeValue2 = 6;
      this.rangeValue3 = 3;
      this.rangeValue4 = 1;
      this.rangeValue5 = 1;
      this.blobData= null;
    }
  }

  onSelectFile1(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url1 = event.target.result;
        console.log(event.target.result);
      }
    }
  }

  onSelectFile2(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url2 = event.target.result;
        console.log(event.target.result);
      }
    }
  }

  generateDesign() {
    console.log(this.url1);
    console.log(this.url2);
    var addButton = document.getElementById("addButton");
    var plagReply = document.getElementById("plagReply");
    addButton['disabled'] = true;
    addButton['innerHTML'] = "Generatingg...";
    if (this.url1 == "https://i.pinimg.com/originals/92/3c/50/923c508dac22439e4f56502f7181e040.jpg" || this.url2 == "https://i.pinimg.com/originals/92/3c/50/923c508dac22439e4f56502f7181e040.jpg") {
      addButton['disabled'] = false;
      addButton['innerHTML'] = "Generate";
      return plagReply['innerHTML'] = "Select Both pictures";

    }
    else {

      this.designGeneratorService.generateDesign(this.url1, this.url2, this.rangeValue1, this.rangeValue2, this.rangeValue3, this.rangeValue4, this.rangeValue5).subscribe(response => {

        let res = JSON.parse(response['_body']);
        if (!res.status) {
          addButton['disabled'] = false;
          addButton['innerHTML'] = "Generate";
          plagReply['innerHTML'] = res.msg;
          console.log(res.msg);
        }
        else {
          addButton['disabled'] = false;
          addButton['innerHTML'] = "Generate";
          plagReply['innerHTML'] = res.msg;
          this.url3 = "data:image/png;base64,"+res.data.image;
          console.log(res.msg);
          this.blobData =  this.convertBase64ToBlobData(res.data.image);

          
        }
      });
      // console.log(this.convertBase64ToBlobData(this.url2));

    }
  }

  downloadImage(){
    if(!this.blobData){
      return alert("Upload both images and Submit")
    }
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(this.blobData, "NewDesign");
    } else { // chrome
      const blob = new Blob([this.blobData], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = "NewDesign";
      link.click();
    }
  }

  convertBase64ToBlobData(base64Data: string, contentType: string = 'image/jpeg', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  ngOnInit() {
  }

}
