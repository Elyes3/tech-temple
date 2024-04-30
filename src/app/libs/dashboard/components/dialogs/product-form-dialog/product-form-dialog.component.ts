import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsComponent } from '../../../views/products/products.component';
import { Product } from 'src/app/libs/shared/models/Product';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { ImageData } from '../../../shared/ImageData';
import { Brand } from 'src/app/libs/shared/enum/Brand';
import { FirebaseService } from 'src/app/libs/firebase/services/firebase.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/libs/shared/models/Category';
@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss']
})
export class ProductFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductsComponent>,
    private firebaseService: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, categories: Category[] },
  ) { }
  orderItemStatus = OrderItemStatus;
  brands: { value: string, text: string }[] = Object.keys(Brand).map((key: string) => ({ text: Brand[key as keyof typeof Brand], value: key }));
  onNoClick(): void {
    this.dialogRef.close();
    }
  async sendProduct(product: Product) {
    if (!this.primaryImageLocal) {
      this.validators.formSubmitted = true;
    }
    else {
      this.isLoading = true;
      const images = [this.primaryImageLocal, ...this.secondaryImagesLocal];
      const imageUrls = await this.firebaseService.insertImagesInFirebase(images, '/products')
      this.isLoading = false;
      if (this.primaryImageLocal && !product.img1)
        product.img1 = imageUrls[0];
      let currentImageUrl = 0;
      // COULD BE IMPROVED
      if (this.secondaryImagesLocal[currentImageUrl] && !product.img2) {
        product.img2 = imageUrls[currentImageUrl];
        currentImageUrl++;
      }
      if (this.secondaryImagesLocal[currentImageUrl] && !product.img3) {
        product.img3 = imageUrls[currentImageUrl];
        currentImageUrl++;
      }
      if (this.secondaryImagesLocal[currentImageUrl] && !product.img4) {
        product.img4 = imageUrls[currentImageUrl];
        currentImageUrl++;
      }
      this.dialogRef.close(product);
    }
  }
  primaryImageLocal: ImageData = {
    url: '',
    file: null
  }
  secondaryImagesLocal: ImageData[] = [];
  validators = {
    imagesOutOfBound: false,
    formSubmitted: false
  }
  isLoading = false;
  onPrimaryImageSelected(event: any) {
    this.getPrimaryImageUrl(event.target.files[0]);
    
  }
  onSecondaryImageSelected(event: any) {
    const images: FileList = event.target.files;
    console.log(this.secondaryImagesLocal.length + images.length)
    if (this.secondaryImagesLocal.length + images.length +
      (this.data.product.img2 ? 1 : 0) +
      (this.data.product.img3 ? 1 : 0) +
      (this.data.product.img4 ? 1 : 0) > 3) {
      this.validators.imagesOutOfBound = true;
      return;
    }
    for (let i = 0; i < images.length; i++) {
      const image = images.item(i);
      if (image != null)
        this.pushSecondaryImageUrl(image);
    }
  }
    getPrimaryImageUrl(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.primaryImageLocal = {
        url: e.target.result,
        file: file,
      }
    }
    reader.readAsDataURL(file)
  }
  pushSecondaryImageUrl(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.secondaryImagesLocal.push({ url: e.target.result, file: file })
    }
    reader.readAsDataURL(file)
  }
  resetPrimaryImage() {
    this.primaryImageLocal = { url: '', file: null }
  }
  removeSavedMainImage() {
    this.data.product.img1 = '';
  }
  

  }
