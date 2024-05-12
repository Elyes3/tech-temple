import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/libs/dashboard/services/products.service';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { Product } from 'src/app/libs/shared/models/Product';
import { Category } from 'src/app/libs/shared/models/Category';
import { CategoriesService } from 'src/app/libs/dashboard/services/categories.service';

@Component({
  selector: 'app-product_list',
  templateUrl: './product_list.component.html',
  styleUrls: ['./product_list.component.css']
})
export class Product_listComponent implements OnInit {
  produit!:Product;
  categories:Category[]=[];
  produits:Product[]=[];
  prods_cat: any;
  constructor(private route:ActivatedRoute,private productsService: ProductsService,private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.prods_cat = params['cat'];
      console.log(this.prods_cat)
      this.retreiveProducts();
    });
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
      description: 'Écran 14.1"  Full HD - Processeur Intel Atom x5-Z8350 Quad Core, up to 1.44GHz, 2Mo de cache - Mémoire 2Go - Stockage 32Go - Wifi - Bluetooth - Windows 10 - Couleur Gris - Garantie 1 ans ',
      productCategory: {
        id: '1',
        name: 'laptop',
        description: 'catt',
        message: 'echrei menna terbah men 8adi',
        products: this.produits
    },
      price: 1000,
      brand: 'lenovo',
      status: OrderItemStatus.AVAILABLE,
      img1: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp',
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
    // this.produits.push(prod)
    // this.produits.push(prod2)
    // this.produits.push(prod3)
    this.categoriesService.loadCategories().subscribe(
      (data: any) => { 
        this.categories = data;
      },
      (error: any) => {
        console.error('An error occurred:', error);
      },
      () => {
        let categorie:any;
         categorie = this.categories.find(category => category.id === this.prods_cat);
        this.produits=categorie.products;
      }
    )
  }
}
