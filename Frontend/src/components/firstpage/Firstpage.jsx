import React from 'react'
import "../header/Header.css"
import HeroImage from "../Assets/hero_image.png";
import Button from "../../Button";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Firstpage = () => {

    useGSAP(() => {
        gsap.from(".front-page h2,.front-page p,.front-page .mt-5", {
            y: 20,
            opacity: 0,
            delay: 0.5,
            duration: 0.5,
            stagger: 0.3,
        });

        gsap.from(".front-page img", {
            x: 180,
            opacity: 0,
            delay: 0.8,
            duration: 0.5,
        });
    });

    return (
        <div className='w-full'>
            <div className='front-page flex flex-row-reverse'>
                <div>
                    <h2 className='text text-2xl text-center'>The sleek, modern sofa adds a touch of elegance to the living room.</h2>
                    <div className='text-center'>
                        <Button style={{ backgroundColor: 'orange', height: '55px', fontWeight: 'bold' }} className='mt-5 rounded-lg' children={"Latest Collection"} />
                    </div>
                </div>
                <div>
                    <img className='rounded-md' src="https://t4.ftcdn.net/jpg/04/66/25/33/360_F_466253361_c4fAjCqVZD4L2boH8vfqjUbUYk0wLcP7.jpg " alt="Nothing" />
                </div>

            </div>
        </div>
    )
}

export default Firstpage
