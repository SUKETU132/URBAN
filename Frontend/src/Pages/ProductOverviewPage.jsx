import React from 'react'
import ProductOverviewOne from '../components/ProductOverview/ProductOverview'
import RelatedProduct from '../components/RelatedProduct/RelatedProduct'

const ProductOverviewPage = () => {
    return (
        <section>
            <div>
                <ProductOverviewOne />
            </div>
            <div>
                <RelatedProduct />
            </div>
        </section>
    )
}

export default ProductOverviewPage
