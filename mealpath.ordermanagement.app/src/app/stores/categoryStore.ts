import { makeObservable, observable } from "mobx";

export default class CategoryStore{
    title= 'hello from mobX';

    constructor(){
        makeObservable(this, {
            title: observable
        })
    }
}