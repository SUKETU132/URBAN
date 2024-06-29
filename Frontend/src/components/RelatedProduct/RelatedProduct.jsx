import React from 'react'
import Item from '../Item/Item'
import data_product from '../Assets/data'
import "./Related.css"

const RelatedProduct = () => {
    return (
        <section>
            <div className="related-product-data flex flex-wrap justify-center">
                {data_product.map((item) => (
                    <Item
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        price={item.new_price}
                        category={item.category}
                        
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                    />
                ))}
            </div>
        </section>
    )
}

export default RelatedProduct
