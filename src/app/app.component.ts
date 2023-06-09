import { Component, OnInit } from '@angular/core';
import { Storage,ref,uploadBytes,listAll,getDownloadURL } from '@angular/fire/storage';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  images:string[]= [];


constructor(private storage: Storage){

}

ngOnInit(): void {
  this.getImages();
}

  subirArchivo($event:any){
    const file =$event.target.files[0];
    const imgRef = ref(this.storage, `images/${file.name}`);


    uploadBytes(imgRef, file).then(x => {
      this.getImages();
    }).catch(error => console.log(error));
  } 

  getImages(){
    const imagesRef = ref(this.storage,'images');

    listAll(imagesRef).then(async images =>{
      this.images=[];

      for(let image of images.items){
        const url= await getDownloadURL(image);
        this.images.push(url);
      }

    }).catch(error =>console.log(error));
  }
}

