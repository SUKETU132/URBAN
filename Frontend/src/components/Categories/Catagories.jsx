import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../header/Header.css";

const Catagories = ({ isShop, setIsShop }) => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState("Shop");
    const [isToggleCategory, setToggleCategory] = useState(false);

    useEffect(() => {
        if (isShop) {
            setMenu("Shop");
            setIsShop(false);
        }
    }, [isShop, setIsShop])

    const navItems = [
        {
            name: "Shop",
            slug: "/"
        },
        {
            name: "Bed",
            slug: "/bed"
        },
        {
            name: "Table",
            slug: "/table",
        },
    ];


    const navItems0 = [
        {
            name: "Chair",
            slug: "/chair"
        },
        {
            name: "Cupboard",
            slug: "/cupboard"
        },
        {
            name: "Sofa",
            slug: "/sofa",
        },
        {
            name: "Dining-table",
            slug: "/dining-table",
        },
        {
            name: "Drowers",
            slug: "/drowers",
        },
    ];

    return (
        <div>
            <ul className='flex ml-auto flex-col sm:flex-row text-center sm:text-left pt-5'>
                {navItems.map((item) =>
                    <li key={item.name} className='mb-2 sm:mb-0'>
                        <button
                            onClick={() => {
                                navigate(item.slug);
                                setMenu(item.name);
                            }}
                            className='inline-block px-6 py-2 duration-200 rounded-full'
                        >
                            {item.name}
                        </button>
                        {menu === item.name ? <hr /> : null}
                    </li>
                )}
                <li className='mb-2 sm:mb-0'>
                    <button
                        onClick={() => setToggleCategory(prev => !prev)}
                        className='inline-block px-6 py-2 duration-200 rounded-full'
                    >
                        All Category
                    </button>
                    {isToggleCategory && <div className='fixed z-10  mt-[30px] px-2 bg-white rounded-md h-[220px] w-[200px]'>
                        {navItems0.map((item) =>
                            <li key={item.name} className='mb-2 sm:mb-0 text-center'>
                                <button
                                    onClick={() => {
                                        navigate(item.slug);
                                        setMenu(item.name);
                                        setToggleCategory(prev => !prev);
                                    }}
                                    className='inline-block px-6 py-2 duration-200 rounded-full'
                                >
                                    {item.name}
                                </button>
                                {menu === item.name ? <hr /> : null}    
                            </li>
                        )}
                    </div>}
                </li>
            </ul>
        </div>
    )
}

export default Catagories
