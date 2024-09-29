import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, invoice, removeFromCart, setCart, setInvoice } = useContext(ProductContext);
    const navigate = useNavigate();

    const placeOrder = () => {
        setCart([]);
        setInvoice({ count: 0, subTotal: 0 });
        navigate('/success');
    }

    return (
        <div className="flex flex-wrap gap-6 justify-center mt-16">
            {
                cart.length > 0 ?
                    <>
                        {
                            cart.map(product => {
                                return (
                                    <div key={product.id} className="shadow-md p-4 flex items-center gap-4 justify-between">
                                        <img src={product.image} alt={product.name} className="w-[200px] h-[120px] object-contain" />

                                        <div className="flex flex-col gap-2 w-[450px]">
                                            <p className="font-bold">{product.name}</p>
                                            <p className="text-xs text-gray-500">{product.smallDescription}</p>
                                            <p className="text-xs">Cantidad: {product.quantity}</p>
                                        </div>
                                        <p className="font-semibold">${product.price}</p>
                                        <FaTrash className="text-red-600 text-xl cursor-pointer" onClick={() => removeFromCart(product)} />
                                    </div>
                                )
                            })
                        }
                        <div className="flex flex-col items-end gap-3 py-4">
                            <p>Subtotal ({invoice.count} {invoice.count > 1 ? 'productos' : 'producto'}): ${invoice.subTotal.toFixed(2)}</p>
                            <button className="bg-blue-600 text-xs text-white p-2 w-[200px] rounded-md" onClick={placeOrder}>Pagar</button>
                        </div>
                    </>
                    :
                    <div className="flex items-center text-2xl justify-center p-4 gap-2">
                        <FaShoppingCart className="text-2xl" />
                        <Link to={'/'} className="text-blue-600">Dale un vistazo a nuestro catálogo</Link>
                    </div>
            }
        </div>
    )
}

export default Cart