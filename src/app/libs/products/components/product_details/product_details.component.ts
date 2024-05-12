import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { Product } from 'src/app/libs/shared/models/Product';
import { ProductsService } from 'src/app/libs/dashboard/services/products.service';
import { CartService } from 'src/app/libs/orders/services/cart.service';
@Component({
  selector: 'app-product_details',
  templateUrl: './product_details.component.html',
  styleUrls: ['./product_details.component.css']
})
export class Product_detailsComponent implements OnInit {
  image:any;
  notavailable:any;
  av_status='AVAILABLE'
  images: any[]=[];
  current_image:number=0;
  qte_dispo:number=3;
  qte:number=1;
  product!:Product;
  prod_id:string='';
  constructor(private router: Router,private route:ActivatedRoute,private productsService: ProductsService,private cartService:CartService) { }

  ngOnInit() {

    const storedProduct = localStorage.getItem('product');
    if (storedProduct) {
      this.product = JSON.parse(storedProduct);
      console.log('Product:', this.product);
      this.images=[this.product.img1,this.product.img2,this.product.img3]
      this.image=this.product.img1;
      console.log(this.image)
      if(this.product.status.toLocaleLowerCase()=='available'){
        this.notavailable=false
      }else{
        this.notavailable=true
      }
    }
  

  }

retreiveProduct():void{
this.productsService.getProductById(this.prod_id).subscribe((prod: any) => { 
  this.product = prod;
  console.log(this.product)
},
(error: any) => {
  console.error('An error occurred:', error);
},
() => {
  this.images=[this.product.img1,this.product.img2,this.product.img3]
  this.image=this.product.img1;
});
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

add_cart(prod:Product){
  const item={
    id: prod.id,
    product: prod,
    quantity: this.qte,
    totalPrice: this.qte*prod.price
  }
    this.cartService.addItemToCart(item)
}

}
