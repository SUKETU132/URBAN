import React, { useState, useCallback, useMemo } from 'react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useGetDataQuery } from '../../store/cartSlice/';
import { useGetProductItemQuery } from '../../store/cartSlice';

const AllProductInd = lazy(() => import('./AllProductIndivisual'));

const AllProduct = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('men');

    const { data, isError, isLoading, refetch, error } = useGetProductItemQuery();

    console.log("This is the product data with owner.", data, error)

    const handleQueryChange = useCallback((newQuery) => {
        setQuery(newQuery);
    }, []);

    const filteredProducts = useMemo(() => {
        if (!data?.products) return [];
        return data.products.filter(product =>
            product.category === category &&
            product.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [data, category, query]);

    if (isError) {
        return <div>Something went wrong.</div>;
    }

    return (
        <section className='w-full h-full'>
            <div className='max-w-6xl bg-green bg-white p-6 ml-auto mr-auto mt-5'>
                <div className='flex items-center justify-between'>
                    <div className='flex w-full items-center ml-4 space-x-2 md:outline-black-100'>
                        <SearchBar
                            query={query}
                            onQueryChange={handleQueryChange}
                        />
                    </div>
                    <div className='flex justify-evenly items-center w-full'>
                        <Link
                            onClick={() => setCategory('men')}
                            className={`mr-4 cursor-pointer ${category === 'men' ? 'font-bold' : ''}`}
                        >
                            Men
                        </Link>
                        <Link
                            onClick={() => setCategory('women')}
                            className={`mr-4 cursor-pointer ${category === 'women' ? 'font-bold' : ''}`}
                        >
                            Women
                        </Link>
                        <Link
                            onClick={() => setCategory('kid')}
                            className={`mr-4 cursor-pointer ${category === 'kid' ? 'font-bold' : ''}`}
                        >
                            Kid
                        </Link>
                    </div>
                </div>
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        {isLoading ? <div className='ml-4'>Loading...</div> : <AllProductInd
                            fetchProducts={refetch}
                            products={filteredProducts}
                        />}
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default AllProduct;
