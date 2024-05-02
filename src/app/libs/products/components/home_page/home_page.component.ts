import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as cocoSSD from '@tensorflow-models/coco-ssd';

import '@tensorflow/tfjs-backend-webgl'

import '@tensorflow/tfjs-backend-cpu'
import { Product } from 'src/app/libs/shared/models/Product';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { Category } from 'src/app/libs/shared/models/Category';
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
      price: 123,
      brand: 'lenovo',
      status: OrderItemStatus.ACTIVE,
      img1: 'https://i.imgur.com/61hySKT.jpeg',
      img2: 'https://i.imgur.com/61hySKT.jpeg',
      img3: 'https://i.imgur.com/61hySKT.jpeg',
      img4: 'https://i.imgur.com/61hySKT.jpeg',
    }
    this.produits.push(prod)
  }

  async load_model(){
    this.model_ml=await cocoSSD.load();
  }

  async detectObjects(element:any) {
    this.predictions = await this.model_ml.detect(element);
    console.log(this.predictions);
    this.displayPredictions(element);
  }

  displayPredictions(imgElement: any) {
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
      circle.style.display = 'none';
    }
    // Draw bounding boxes around detected objects
    this.predictions.forEach((prediction:any,index:any) => {
      // Calculate the center of the bounding box
      const centerX = prediction.bbox[0] + prediction.bbox[2] / 2;
      const centerY = prediction.bbox[1] + prediction.bbox[3] / 2;
      circles[index].style.left = `${centerX}px`;
      circles[index].style.top = `${centerY}px`;
      circles[index].style.display ='' 
      console.log("circle indice",index," x : ",centerX," y : ",centerY);
      container.appendChild(circles[index]);
      buts[index].setAttribute('data-container', 'body');
      buts[index].setAttribute('data-toggle','popover');
      buts[index].setAttribute('data-content', '100dt');
      buts[index].setAttribute('title', 'price');

    });
  }
}
