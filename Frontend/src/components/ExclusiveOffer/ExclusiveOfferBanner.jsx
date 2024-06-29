import React from 'react'
import image from "../Assets/exclusive_image.png";
import "./Exclusive.css";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../../Button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const ExclusiveOfferBanner = () => {

  useGSAP(() => {
    gsap.from(".exclusive-left h1,.exclusive-left p,.exclusive-left button", {
      y: 30,
      opacity: 0,
      delay: 0.5,
      duration: 0.5,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".exclusive-section",
        scroller: "body",
      }
    });

    gsap.from(".exclusive-right img", {
      x: 180,
      opacity: 0,
      delay: 0.8,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".exclusive-section",
        scroller: "body",
      }
    });

    gsap.from(".exclusive-section", {
      y: 100,
      opacity: 0,
      delay: 0.8,
      duration: 0.2,
      scrollTrigger: {
        trigger: ".exclusive-section",
        scroller: "body",
      }
    });

  });

  return (
    <section className='exclusive-section'>
      <div className='exclusive-section-subpart'>
        <div className='exclusive-left'>
          <h1>
            Exclusive
          </h1>
          <h1>
            Offer For You
          </h1>
          <p>
            ONLY ON BEST SELLER PRODUCTS
          </p>
          <Link to="/women"><Button>Check Now</Button></Link>
        </div>
        <div className='exclusive-right'>
          <img src={image} alt="Network issue" />
        </div>
      </div>
    </section>
  )
}

export default ExclusiveOfferBanner
