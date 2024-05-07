import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsOpenService {
  private isOpenSubject = new BehaviorSubject<boolean>(false); // Initial value
  isOpen$ = this.isOpenSubject.asObservable();

  setIsOpen() {
    const currentValue = this.isOpenSubject.getValue();
    this.isOpenSubject.next(!currentValue);
  }

  constructor() { }
}
