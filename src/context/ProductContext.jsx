/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { products_data } from "../utils/mock-products";

export const ProductContext = createContext([])

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState(products_data);
    const [cart, setCart] = useState([]);
    const [invoice, setInvoice] = useState({
        count: 0,
        subTotal: 0
    });
    const [message, setMessage] = useState('');

    const filterProducts = category => {
        if (category) {
            const filteredProducts = products_data.filter(product => {
                if (product.category === category) {
                    return product;
                }
            })
            setProducts(filteredProducts);
        } else {
            setProducts(products_data);
        }
    }

    const addToCart = product => {
        // setMessage('Se agregó el producto');
        setMessage(`Se agregó ${product.name} al carrito`);
        setCart(oldCart => {
            let previous = [...oldCart];
            if (previous.length == 0) {
                previous.push({ ...product, quantity: 1 })
            } else {
                const isProduct = previous.find(prod => prod.id === product.id)
                if (!isProduct) {
                    previous.push({ ...product, quantity: 1 })
                } else {
                    previous = previous.map(prod => {
                        return prod.id == isProduct.id ? { ...isProduct, quantity: isProduct.quantity + 1 } : prod;
                    })
                }
                // Código propuesto por compañero. Validad si funciona 👇
                // const isProduct = previous.find((item) => item.id === product.id);
                // if (isProduct) {
                //     previous = previous.map((item) => {
                //         if (item.id === product.id) {
                //             return { ...item, quantity: item.quantity + 1 };
                //         }
                //         return item;
                //     });
                // } else {
                //     previous.push({ ...product, quantity: 1 });
                // }
            }
            return previous;
        })
    }

    const setInvoiceData = () => {
        setInvoice(previous => {
            let newInvoice = { ...previous, count: 0, subTotal: 0 }
            cart.forEach(product => {
                newInvoice.count += product.quantity;
                newInvoice.subTotal += product.quantity * product.price;
            })
            return newInvoice;
        })
    }


    // 2 == 2  => true
    // 2 == "2" => true
    // 2 === "2" => false

    const removeFromCart = (product) => {
        setCart(oldCart => {
            let previous = [...oldCart];
            const isProduct = previous.find(prod => prod.id == product.id)
            if (isProduct) {
                const index = previous.indexOf(isProduct);
                previous.splice(index, 1)
            }
            return previous;
        })
    }

    useEffect(() => {
        setTimeout(() => { setMessage('') }, 2000)
        setInvoiceData();
    }, [cart])

    return (
        <ProductContext.Provider value={{ products, filterProducts, cart, addToCart, invoice, removeFromCart, setCart, setInvoice }}>
            {
                message &&
                (<div className="absolute right-0 top-20 bg-green-600 text-white w-[300px] p-2 text-center">
                    {message}
                </div>)
            }
            {children}
        </ProductContext.Provider>
    )
}