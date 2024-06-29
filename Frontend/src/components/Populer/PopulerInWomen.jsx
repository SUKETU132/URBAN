import React, { useRef, useEffect } from 'react';
import Item from '../Item/Item';
import "./Populer.css";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSelector } from 'react-redux';
import { useGetDataQuery } from '../../store/cartSlice';

gsap.registerPlugin(ScrollTrigger);

const PopulerInWomen = () => {
    const user = useSelector(state => state.auth.userData);
    const { data } = useGetDataQuery();
    console.log(data);

    const GsapRef = useRef(null);
    const CardRef = useRef(null);

    useGSAP(() => {
        gsap.from(GsapRef.current, {
            y: 30,
            opacity: 0,
            delay: 0.5,
            duration: 0.5,
            stagger: 0.3,
            scrollTrigger: {
                trigger: "#Trigger",
                scroller: "body",
            }
        });

        gsap.from(CardRef.current, {
            y: 30,
            opacity: 0,
            delay: 1,
            duration: 0.5,
            stagger: 0.3,
            scrollTrigger: {
                trigger: "#Trigger",
                scroller: "body",
            }
        });
    }, []);

    // Filter the data to include only the first four items
    const filteredData = data ? data.products.slice(0, 4) : [];
    useEffect(() => { }, []);

    return (
        <div className="populer flex w-full flex-col justify-center items-center" id='Trigger'>
            <h1 ref={GsapRef}>POPULAR PRODUCT</h1>
            <div className='populer-women-section flex flex-wrap justify-center' ref={CardRef}>
                {filteredData.map((item) => (
                    <Item
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        image={item.mainImage.url}
                        price={item.price}
                        category={item.category}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                    />
                ))}
            </div>
        </div>
    );
}

export default PopulerInWomen;
