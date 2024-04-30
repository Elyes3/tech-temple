import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { ImageData } from '../../dashboard/shared/ImageData';
import { v4 as uuid } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private storage: AngularFireStorage) { }
  saveImage(f: File, filepath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const file = f;
      const filePath = filepath;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            resolve(downloadURL)
          }, error => {
            reject(error)
          })
        })
      ).subscribe()
    });
  }
  async insertImagesInFirebase(images: ImageData[], imageFolder: string) {
    const firebaseImageUrls: string[] = [];
    for (let i = 0; i < images.length; i++) {
      let image = images[i]
      if (image.file != null) {
        const imageUrl: string = await this.saveImage(image.file, `${imageFolder}/${uuid()}`);
        firebaseImageUrls.push(imageUrl);
      }
    }
    return firebaseImageUrls;
  }
}
