import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product_details',
  templateUrl: './product_details.component.html',
  styleUrls: ['./product_details.component.css']
})
export class Product_detailsComponent implements OnInit {
  image:string=""
  images: string[]=["https://www.tunisianet.com.tn/315861-large/pc-portable-lenovo-v15-g4-amn-amd-dual-core-8-go.jpg","https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg","https://media.wired.com/photos/64daad6b4a854832b16fd3bc/4:3/w_1787,h_1340,c_limit/How-to-Choose-a-Laptop-August-2023-Gear.jpg"];
  current_image:number=0;
  qte_dispo:number=3;
  qte:number=1;
  constructor() { }

  ngOnInit() {
    this.image=this.images[0]
    console.log(this.images)
}
next_image():void{
  if(this.current_image==2){
    this.image=this.images[0];
    this.current_image=0;
  }else{
    this.current_image=this.current_image+1
    this.image=this.images[this.current_image]
  }
}

perv_image():void{
  if(this.current_image==0){
    this.image=this.images[2];
    this.current_image=2;
  }else{
    this.current_image=this.current_image-1
    this.image=this.images[this.current_image]
  }
}

affiche_img(img:string):void{
  this.image=img;
  this.current_image=this.images.indexOf(img);
}

add_qte():void{
  if(this.qte<this.qte_dispo)
 { this.qte=this.qte+1;}
}
minus_qte():void{
  if(this.qte>1)
 { this.qte=this.qte-1;}
}

}
