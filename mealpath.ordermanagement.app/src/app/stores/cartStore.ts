// CartStore.ts
import { action, makeAutoObservable, runInAction, toJS } from 'mobx';
import { Product } from '../models/Product';
import { toast } from 'react-toastify';
import CartItem from '../models/cartItem';
import agent from '../api/agent';

export default class CartStore {
    products: Product[] = [];

    constructor(){
        makeAutoObservable(this)
    }

    @action
    addToCart(product: Product) {       
        var isProductAdded = false;   
        console.log(product)
        product.quantity = 1
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

    checkout = async () =>{
        //this.loading = true;
        var cartItems = toJS(this.products)
        console.log(cartItems)
        try{
            var url = await agent.Orders.checkout(cartItems);
            console.log('url' + url)
            window.location.href = url;
            runInAction(() => {
            //this.loading = false;
        })
        }catch(error){
            console.log(error)
            runInAction(() => {
            //this.loading = false;
        })
    }
  }

    getCartItems = () => {
        //console.log('products raw', this.products)
        //console.log('toJS products', toJS(this.products))
        return toJS(this.products)
        //return toJS(this.products)
    }

    isCartEmpty = () => {
        const cartItems = toJS(this.products)
        return cartItems.length == 0 ? true: false; 
    }
}
