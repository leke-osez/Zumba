import React, { useContext, createContext, useState, useEffect } from "react";
import {toast} from 'react-hot-toast';


const Context = createContext();

export const StateContext = ({children})=>{
    const [cartItems, setCartItems] = useState([])
    const [showCart, setShowCart] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [qty, setQty] = useState(1)
    let foundProduct;
    let index;
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
            
            setCartItems([...cartItems, product])
        }
        
        toast.success(`${qty} ${product.name} added to cart.`)
    }

    const toggleCartQuantity = (id, value)=>{
        foundProduct = cartItems.find((item)=> id === item._id)
        index = cartItems.findIndex((item)=> id === item._id)


        if (value === 'inc'){
           
            setCartItems( cartItems.map((item)=>{
                // increase item in cart
                if (item._id === id){
                    return {...item, quantity: item.quantity + 1}
                }
                return item
            }))
            setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price)
            setTotalQuantity(prevTotalQuantity=> prevTotalQuantity +1)

        } else if (value === 'dec'){
            //decrease item on cart
            if (foundProduct.quantity > 1){
            setCartItems( cartItems.map((item)=>{
                if (item._id === id){
                    return {...item, quantity: item.quantity - 1}
                }
                return item
            }))
            setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price)}
            setTotalQuantity(prevTotalQuantity=> prevTotalQuantity - 1)

        } else if (value === 'del'){
            setCartItems(cartItems.filter((item)=> item._id !== id))
            setTotalPrice((prevTotalPrice)=> prevTotalPrice - (foundProduct.quantity * foundProduct.price))
            setTotalQuantity((prevTotalQuantity)=> prevTotalQuantity - foundProduct.quantity )
        }

        // setCartItems(cartItems.map((item,index)=>{
        //     if (item._id === id && value === 'inc'){
        //         return {...item, quantity: item.quantity+1}
        //     } else if (item._id === id && value === 'dec'){
        //         return {...item, quantity: item.quantity-1}
        //     }
        //     else return item
        // }
        // ))

        
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
                onAdd, 
                toggleCartQuantity,
                setCartItems,
                setTotalPrice,
                setTotalQuantity

            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = ()=>useContext(Context)




