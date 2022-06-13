import React, { useContext, createContext, useState, useEffect } from "react";
import {toast} from 'react-hot-toast';


const Context = createContext();

export const StateContext = ({children})=>{
    const [cartItems, setCartItems] = useState([])
    const [showCart, setShowCart] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [qty, setQty] = useState(1)

    const incQty = ()=>{
        setQty((prevQty)=> prevQty + 1)
    }

    const decQty = ()=>{
        setQty((prevQty)=> {
            if (prevQty -1 < 1) return 1
            return prevQty - 1
        }
        )
    }

    const onAdd = (product, quantity)=>{
        const checkCart = cartItems.find((cartItem)=>cartItem._id === product._id)
        setTotalPrice((prevTotalPrice)=> prevTotalPrice + (product.price * quantity))
        setTotalQuantity((prevTotalQuantity)=> prevTotalQuantity + quantity)
        
        if (checkCart){
            setCartItems(
                cartItems.map((cartItem)=>{
                    if (product._id === cartItem._id){
                        return{
                            ...cartItem,
                            quantity: cartItem.quantity + quantity
                        }
                    }
                })
            )

        } else{
            product.quantity = quantity;
            
            setCartItems([...cartItems, {...product}])
        }
        
        toast.success(`${qty} ${product.name} added to cart.`)
    }
    return(
        <Context.Provider
            value ={{
                cartItems,
                setShowCart,
                showCart,
                qty,
                totalQuantity,
                totalPrice,
                incQty,
                decQty,
                onAdd

            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = ()=>useContext(Context)




