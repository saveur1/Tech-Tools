import axios from "../api/axios";
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addToCart = (id,quantity)=>async(dispatch,getState)=>{

    const { data } = await axios.get(`/products/${id}`);

    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity
        }
    });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id)=>async(dispatch,getState)=>{

    dispatch({
        type:REMOVE_FROM_CART,
        payload:id
    });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}

export const saveShippinInfo = (shippings)=>async(dispatch)=>{

    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:shippings
    });

    localStorage.setItem("shippingInfo",JSON.stringify(shippings));
}