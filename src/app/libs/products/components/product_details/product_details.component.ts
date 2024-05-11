import { Component, OnInit } from '@angular/core';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { Product } from 'src/app/libs/shared/models/Product';

@Component({
  selector: 'app-product_details',
  templateUrl: './product_details.component.html',
  styleUrls: ['./product_details.component.css']
})
export class Product_detailsComponent implements OnInit {
  image:any;
  images: any[]=[];
  current_image:number=0;
  qte_dispo:number=3;
  qte:number=1;
  product!:Product;
  constructor() { }

  ngOnInit() {
    this.retreiveProduct();
}

retreiveProduct():void{
  this.product={
    id: '123',
    name: 'PC PORTABLE LENOVO V15 G4 AMN AMD DUAL CORE 8 GO',
    description: 'Écran 15,6" FHD (1 920 x 1 080 px) - Processeur AMD Athlon Silver 7120U, up to 3.5 Ghz, 3 Mo de cache - Mémoire 8 Go LPDDR5-4800 MHz - Disque SSD 256 Go M.2 PCIe 4.0 NVMe - Carte Graphique AMD Radeon 610M - 2x Haut-parleurs 1.5W - Caméra HD 720p avec obturateur de confidentialité - Wi-Fi  - Bluetooth 5.1 - 2x USB 3.2 - 1x USB-C 3.2 - 1x HDMI 1.4b - 1x Ethernet (RJ-45) - 1x Jack (3.5 mm) - Couleur Noir',
    productCategory: {
      id: '1',
      name: 'laptop',
      description: '5fif ndhif',
      message: 'echrei menna terbah men 8adi',
      products: [this.product]
  },
    price: 75.00,
    brand: 'lenovo',
    status: OrderItemStatus.AVAILABLE,
    img1: 'https://i.imgur.com/61hySKT.jpeg',
    img2: 'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg","https://media.wired.com/photos/64daad6b4a854832b16fd3bc/4:3/w_1787,h_1340,c_limit/How-to-Choose-a-Laptop-August-2023-Gear.jpg',
    img3: 'https://www.tunisianet.com.tn/315861-large/pc-portable-lenovo-v15-g4-amn-amd-dual-core-8-go.jpg',
    img4: 'https://i.imgur.com/61hySKT.jpeg',
  }
  this.images=[this.product.img1,this.product.img3,this.product.img4]
  this.image=this.product.img1;
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
