import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"
import type { CartItem, Guitar } from "../types"


const useCart = () => {
    //state
    //No se pueden tener hooks de forma condicional ni dentro de un loop, ni dentro de funciones
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []

    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


    function addToCart(item : Guitar) {
        //devuelve -1 si el elemento aun no esta agregado al array
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)

        if (itemExists >= 0) {
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {

            const newItem : CartItem = {...item, quantity : 1} //Agrega un nuevo elemento cantidad y lo iguala a 1
            setCart([...cart, newItem])

        }

    }
    function removeFromCart(id: Guitar['id']) {
        setCart((prevCart) => prevCart.filter(guitar => guitar.id !== id))
        /*Método filter: Dentro de la función de flecha, 
        se está utilizando el método filter en el array 
        prevCart. Este método crea un nuevo array que 
        incluye solo los elementos del array original para 
        los cuales la función de filtro devuelve true. 
        En este caso, se están filtrando todos los elementos
         del carrito (guitar) cuyo id no coincide con el id
          proporcionado como argumento a la función removeFromCart. */
    }

    function increaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < 5) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }
    function clearCart() {
        setCart([])
    }

    //state derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])

    const carTotal = () => cart.reduce((total, item) => total + (item.quantity * item.price), 0)
    /*(total, item) => total + (item.quantity * item.price):
     Este es el callback que se pasa a reduce(). Toma dos parámetros: total y item.
      total representa el valor acumulado durante la reducción, y item representa cada
       elemento del array cart. Dentro de esta función, se calcula el subtotal de cada 
       item multiplicando su cantidad (item.quantity) por su precio (item.price). Luego, 
       este subtotal se suma al total acumulado.
    , 0): Este argumento 0 es el valor inicial del total.
     En el primer paso de la reducción, total tendrá este
      valor. En este caso, el total inicial es cero, lo que
       significa que comenzamos a sumar desde cero */



    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        carTotal,
    }
}

export default useCart