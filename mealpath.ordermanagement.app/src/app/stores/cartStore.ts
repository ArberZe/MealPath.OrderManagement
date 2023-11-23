// CartStore.ts
import { action, makeAutoObservable } from 'mobx';
import { Product } from '../models/Product';
import { toast } from 'react-toastify';

export default class CartStore {
    products: Product[] = [];

  constructor(){
    makeAutoObservable(this)
  }

  @action
  addToCart(product: Product) {       
        var isProductAdded = false;   
        console.log(product.productID)
        this.products.forEach(item => {
            if(product.productID == item.productID){
                isProductAdded = true;
            }
        })
        if(isProductAdded){
            toast.error('This product is already added')
        }else{
            this.products.push(product);
            toast.success('product was added sucessfully')
        }
  }

  @action
  clearCart() {
    this.products = [];
  }
}
