import { Component } from '@angular/core';
import { CartItem } from 'src/app/libs/shared/models/CartItem';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { PaymentComponent } from '../payment/payment.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BillingFormData } from 'src/app/libs/shared/models/BillingAddressForm';
import { OrderService } from '../../services/order.service';
import { PaymentMethod } from 'src/app/libs/shared/enum/PaymentMethod';
import { InvoiceStatus } from 'src/app/libs/shared/enum/InvoiceStatus';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems: CartItem[] = [];
  orderId!: string | null;
  private cartItemsSubscription: Subscription;
  cartPrice: number = 0;
  showCashPaySuccess: boolean = false;
  showOnlinePaySuccess: boolean = false;
  formData: BillingFormData = {
    firstName: 'First-name',
    lastName: 'Last-name',
    email: 'you@example.com',
    address: '1234 Main St',
    city: 'your-city',
    postalCode: 'your-postal-code',
    delivery: true
  };

  constructor(private cartService: CartService, private orderService: OrderService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
      this.getCartPrice();
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('orderId');
    })
  }
  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }

  getCartPrice() {
    this.cartPrice = this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  openOnlinePaymentDialog(): void {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showOnlinePaySuccess = true;
      }
    });
  }

  redirectToSuccessScreen(paymentMethod: string): void {
    const invoiceData = {
      paymentMethod: paymentMethod === 'cash' ? PaymentMethod.CASH_ON_DELIVERY : PaymentMethod.CREDIT_CARD,
      invoiceStatus: InvoiceStatus.PAID,
    };

    this.orderService.updateInvoiceForOrder(this.orderId, invoiceData).subscribe(
      response => {
        console.log('Invoice updated successfully:', response);
        // Handle success
        if (paymentMethod === 'cash') {
          this.showCashPaySuccess = true;
          this.showOnlinePaySuccess = false;
        } else if (paymentMethod === 'online') {
          this.showOnlinePaySuccess = true;
          this.showCashPaySuccess = false;
        }
        this.cartService.clearCart();
      },
      error => {
        console.error('Failed to update invoice:', error);
        // Handle error
      }
    );

  }


  handleFormData(data: BillingFormData) {
    this.formData = data;
    console.log('Form Data:', this.formData);
  }
}
