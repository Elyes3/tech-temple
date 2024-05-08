import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as cocoSSD from '@tensorflow-models/coco-ssd';

import '@tensorflow/tfjs-backend-webgl'

import '@tensorflow/tfjs-backend-cpu'
import { Product } from 'src/app/libs/shared/models/Product';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { Category } from 'src/app/libs/shared/models/Category';
declare var $: any;
@Component({
  selector: 'app-home_page',
  templateUrl: './home_page.component.html',
  styleUrls: ['./home_page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Home_pageComponent implements OnInit {
  @ViewChild('imageElement') imageElement!: ElementRef;
  constructor() { }

  produit!:Product;
  produits:Product[]=[];
  model_ml:any;
  predictions:any;

  async ngOnInit() {
    this.retreiveProducts();
    await this.load_model();
  }

  retreiveProducts():void{
    const prod={
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
      price: 2000,
      brand: 'lenovo',
      status: OrderItemStatus.AVAILABLE,
      img1: 'https://i.imgur.com/61hySKT.jpeg',
      img2: 'https://i.imgur.com/61hySKT.jpeg',
      img3: 'https://i.imgur.com/61hySKT.jpeg',
      img4: 'https://i.imgur.com/61hySKT.jpeg',
    }
    const prod2={
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
      price: 1000,
      brand: 'lenovo',
      status: OrderItemStatus.AVAILABLE,
      img1: 'https://i.imgur.com/tsFXgXc.jpeg',
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
    this.produits.push(prod)
    this.produits.push(prod2)
    this.produits.push(prod3)
    
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
      buts[index].setAttribute('data-bs-trigger', 'hover');
      buts[index].setAttribute('data-toggle','popover');
      $('#btn'+(index+1)).popover({
        content:prod.price,
        title: prediction.class
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

  fn(){
    console.log("click")
  }
}
