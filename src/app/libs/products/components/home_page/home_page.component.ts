import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as cocoSSD from '@tensorflow-models/coco-ssd';

import '@tensorflow/tfjs-backend-webgl'

import '@tensorflow/tfjs-backend-cpu'
import { Product } from 'src/app/libs/shared/models/Product';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { Category } from 'src/app/libs/shared/models/Category';
import { ProductsService } from 'src/app/libs/dashboard/services/products.service';
import { CartService } from 'src/app/libs/orders/services/cart.service';
import { Router } from '@angular/router';
import { string } from '@tensorflow/tfjs';
declare var $: any;
@Component({
  selector: 'app-home_page',
  templateUrl: './home_page.component.html',
  styleUrls: ['./home_page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Home_pageComponent implements OnInit {
  @ViewChild('imageElement') imageElement!: ElementRef;
  constructor(private router: Router,private productsService: ProductsService,private cartService:CartService) { }
  prod_promo!:Product;
  slide1!:Product;
  produits:Product[]=[];
  produits_promo:Product[]=[];
  model_ml:any;
  predictions:any;
  av_status='AVAILABLE'
  async ngOnInit() {
    this.retreiveProducts();
    await this.load_model();
  }

  retreiveProducts():void{
     this.prod_promo={
      id: '100',
      name: 'desktop setup',
      description: 'setup sektop for gaming',
      productCategory: {
        id: '100',
        name: 'desktop promotion',
        description: 'nice',
        message: 'pack',
        products: [this.prod_promo]
    },
      price: 2500,
      brand: 'lenovo',
      status: OrderItemStatus.AVAILABLE,
      img1: 'https://firebasestorage.googleapis.com/v0/b/techtemple-47a6e.appspot.com/o/products%2Faa63f973-9bc7-464c-8744-b36755c2347b?alt=media&token=1d645033-c889-4e4f-83b6-34ef6f8d87c7',
      img2: 'https://i.imgur.com/61hySKT.jpeg',
      img3: 'https://i.imgur.com/61hySKT.jpeg',
      img4: 'https://i.imgur.com/61hySKT.jpeg',
    }
    this.slide1={
      id: '101',
      name: 'laptop',
      description: 'Ecran 15,6" Full HD - Processeur Intel Core i7-1255U, 12è Génération, up to 4.7 Ghz, 12 Mo de cache - 8 Go de mémoire - Disque SSD 512 Go M.2 NVMe - Intel Iris Xe Graphics - Wifi - Bluetooth - USB Type C - USB Type-A - HDMI - Lecteur de cartes - Webcam HP avec micro intégré - Windows 11 - Couleur Silver - Garantie 1 an',
      productCategory: {
        id: '101',
        name: 'laptop promotion',
        description: 'nice',
        message: '',
        products: [this.slide1]
    },
      price: 2009,
      brand: 'hp',
      status: OrderItemStatus.AVAILABLE,
      img1: 'https://firebasestorage.googleapis.com/v0/b/techtemple-47a6e.appspot.com/o/products%2F68603aa9-aadc-4454-b241-25ec7e7c93a9?alt=media&token=7cee2d75-6e13-43ba-92aa-bcd958d7a577',
      img2: 'https://i.imgur.com/61hySKT.jpeg',
      img3: 'https://i.imgur.com/61hySKT.jpeg',
      img4: 'https://i.imgur.com/61hySKT.jpeg',
    }
    const prod3={
      id: '1',
      name: 'laptop test1',
      description: 'rani behy echrouni',
      productCategory: {
        id: '1',
        name: 'laptop',
        description: '5fif ndhif',
        message: 'echrei menna terbah men 8adi',
        products: this.produits
    },
      price: 3000,
      brand: 'lenovo',
      status: OrderItemStatus.AVAILABLE,
      img1: 'https://i.imgur.com/klE9TXP.jpeg',
      img2: 'https://i.imgur.com/61hySKT.jpeg',
      img3: 'https://i.imgur.com/61hySKT.jpeg',
      img4: 'https://i.imgur.com/61hySKT.jpeg',
    }
    this.produits_promo.push(this.prod_promo)
     this.produits_promo.push(this.slide1)
     console.log(this.produits_promo )
    // this.produits.push(prod3)
    this.productsService.loadProducts().subscribe(
      (data: any) => { 
        this.produits = data.slice(0, 9);
        console.log(this.produits)
      },
      (error: any) => {
        console.error('An error occurred:', error);
      },
      () => {
        
      }
    )
  }

  async load_model(){
    this.model_ml=await cocoSSD.load();
  }

  async detectObjects(parentelement:any,produit:any) {
    console.log(parentelement)
    let element:any;
    element=parentelement.querySelector('img');
    this.predictions = await this.model_ml.detect(element);
    console.log(this.predictions);
    this.displayPredictions(element,produit);
  }

  displayPredictions(imgElement: any,prod:any) {
    var circles:any;
    circles = document.getElementsByClassName('circle');
    var buts:any;
    buts=document.getElementsByClassName('btn_pop');
    var container:any;
    container = imgElement.parentNode;
    console.log(circles)
    for (let i = 0; i < circles.length; i++) {
      console.log(i)
      let circle = circles[i] as HTMLElement; // Type assertion to HTMLElement
      circle.style.opacity = '0';
    }
    // Draw bounding boxes around detected objects
    this.predictions.forEach((prediction:any,index:any) => {
      // Calculate the center of the bounding box
      const centerX = prediction.bbox[0] + prediction.bbox[2] / 2;
      const centerY = prediction.bbox[1] + prediction.bbox[3] / 2;
      let circle:any;
      circle=document.getElementById("cir"+(index+1));
      console.log('cir'+(index+1))
      console.log(circle);
      circle.style.left = `${centerX}px`;
      circle.style.top = `${centerY}px`;
      circle.style.opacity ='1' 
      console.log("circle indice",index," x : ",centerX," y : ",centerY);
      container.appendChild(circle);
      $('#btn'+(index+1)).popover('dispose');
      buts[index].setAttribute('data-bs-trigger', 'hover');
      buts[index].setAttribute('data-toggle','popover');
      buts[index].setAttribute('data-content',prod.id);
      $('#btn'+(index+1)).popover({
        content:'prix: '+prod.price+' DT',
        title: prod.productCategory.name
      });
    });
  }

  leave_image(){
    console.log("leave image")
    $('#btn1').popover('dispose');
    $('#btn2').popover('dispose');
    $('#btn3').popover('dispose');
    let circles_element1:any;
    let circles_element2:any;
    let circles_element3:any;
    circles_element1=document.querySelector('#cir1');
    circles_element2=document.querySelector('#cir2');
    circles_element3=document.querySelector('#cir3');
    if(circles_element1){
      circles_element1.style.opacity='0'
    }
    if(circles_element2){
      circles_element2.style.opacity='0'
    }
    if(circles_element3){
      circles_element3.style.opacity='0'
    }
  }

  fn(btn_id:string){
    console.log("click "+btn_id)
    console.log( $('#'+btn_id).data().content)
    const prod_id=$('#'+btn_id).data().content
    let prod=this.produits.find(product => product.id === prod_id);
    if (!prod){
      prod=this.produits_promo.find(product => product.id == prod_id);
      console.log('promo')
    }
    console.log(prod)
    $('#'+btn_id).popover('dispose');
    localStorage.setItem('product', JSON.stringify(prod));
  this.router.navigate(['/details']);
  }

  add_cart(prod:Product){
    const item={
      id: prod.id,
      product: prod,
      quantity: 1,
      totalPrice: prod.price
    }
    console.log(item)
      this.cartService.addItemToCart(item)
  }
}
