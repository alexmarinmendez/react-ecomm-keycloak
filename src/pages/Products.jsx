import { useContext } from "react";
import { ProductContext } from "../context/ProductContext"

const Products = () => {
    const { products, addToCart } = useContext(ProductContext);

    return (
        <div className="flex flex-wrap gap-6 justify-center mt-16">
            {
                products.map(product => {
                    return (
                        <div key={product.id} className="w-[200px] border p-4 hover:shadow-lg">
                            <img src={product.image} alt={product.name} className="w-[200px] h-[150px] object-contain block m-auto" />
                            <div className="flex flex-col gap-2 my-4 h-[120px]">
                                <p className="text-center font-bold">{product.name}</p>
                                <p className="text-center text-sm">{product.price}</p>
                                <p className="text-xs text-gray-500">{product.smallDescription}</p>
                            </div>
                            <button className="w-full bg-blue-700 text-white text-center text-sm p-2" onClick={() => addToCart(product)}>+ Add to cart</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Products