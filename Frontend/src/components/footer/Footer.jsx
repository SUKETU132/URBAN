import { ChevronRight } from 'lucide-react'
import React, { useRef } from 'react'
import Input from "../../Input";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterTwo() {

    const CardRef = useRef(null);

    useGSAP(() => {
        gsap.from(CardRef.current, {
            y: 40,
            opacity: 0,
            delay: 1,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: CardRef.current,
                scroller: "body",
            }
        });
    });

    return (
        <footer className="w-full mb-5" ref={CardRef}>
            <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row mt-9">
                <div className="w-full px-4 md:w-1/2 lg:px-0">
                    <h1 className="max-w-sm text-3xl font-bold">Subscribe to our Newsletter</h1>
                    <form action="" className="mt-4 inline-flex w-full items-center md:w-3/4">
                        <Input
                            className="flex h-10 w-full rounded-md border border-black/20 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            placeholder="Email"
                        />
                        <button
                            type="button"
                            className="ml-4 rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </form>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="mb-8 lg:mb-0">
                            <p className="mb-6 text-lg font-semibold text-gray-700 ">Company</p>
                            <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                                <li>About us</li>
                                <li>Company History</li>
                                <li>Our Team</li>
                                <li>Our Vision</li>
                                <li>Press Release</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="my-4" />
            <div className="mx-auto max-w-6xl items-center justify-between px-4 md:flex lg:px-0">
                <div className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1" id="cloth">
                        <path fill="#f37a5d" fillRule="evenodd" d="M32 16c0 8.824-7.176 16-16 16S0 24.824 0 16 7.176 0 16 0s16 7.176 16 16z" clipRule="evenodd"></path>
                        <path d="M18.273 31.77c.313-.045.642-.033.948-.096a15.868 15.868 0 0 0 5.718-2.41 16.12 16.12 0 0 0 5.801-7.041c.406-.957.72-1.962.934-3.002.039-.19.026-.396.058-.588L20.537 7.438a.326.326 0 0 0-.082-.063l-1.336-.363-.668-.668v.12l-.181.73-.487-.487H15.78l.098.402-.766-.765-.91.547h-.06l-1.336.484c-.122.06-.243.183-.182.365l-2.732 5.645c-.061.06-.061.183 0 .304l2.671 5.89c.014.025.03.048.05.067l.355.356H12.38l-.79 4.857a.289.289 0 0 0-.009.147c.003.017.012.03.018.047a.26.26 0 0 0 .043.076c.005.006.006.016.011.021l6.62 6.62z" opacity=".25"></path>
                        <path fill="#fff" d="M18.451 6.344v.12l-1.396 5.586v13.113c0 .182-.122.303-.304.303s-.303-.182-.303-.303V11.868l-1.336-5.403v-.121l-.91.546h-.061l-1.336.486c-.121.06-.243.182-.182.364l-2.732 5.646c-.06.06-.06.182 0 .303l2.671 5.889c.122.243.547.182.547-.06.303-1.276.303-2.186.607-2.915h1.335c.183 0 .304.122.304.304l-.06 2.124c0 .061 0 .122-.061.183l-.547.667a.46.46 0 0 1-.243.122h-2.063l-.79 4.856c-.06.183.06.365.243.365 3.035.546 6.192.607 9.41 0 .182-.061.242-.182.242-.365-.242-1.578-.424-3.278-.667-4.917h-2.125c-.122 0-.182-.06-.243-.121l-.546-.668c-.061-.06-.061-.122-.061-.182l-.06-2.125c0-.182.181-.304.303-.304h1.457c.182 1.032.425 2.064.485 3.097 0 .182.183.303.304.303h1.518c.182 0 .303-.182.303-.303-.303-4.007-.182-8.257-1.517-11.838.06-.183-.061-.365-.183-.425L19.12 7.01l-.668-.667zm-.668.364H15.78l.971 4.006 1.032-4.006zm-4.674 5.646c.425.91.668 1.942.364 3.278l-.971-2.186.607-1.092z"></path>
                    </svg>
                    <span className="ml-4 text-lg font-bold">URBAN FURNIX</span>
                </div>
                <div className=" mt-4 md:mt-0">
                    <p className="text-sm font-medium text-gray-500">© 2024 URBAN FURNIX. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
