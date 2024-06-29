import React from 'react'
import { ChevronLeft, ChevronRight, Heart, Share } from 'lucide-react'

export function ProductOne() {
  return (
    <div className="sp mx-auto max-w-7xl px-2 py-10 lg:px-0">
      <div className="overflow-hidden">
        <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
          <div className="items-start justify-between lg:flex lg:space-x-8">
            <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
              <div className="w-full xl:flex xl:flex-row-reverse">
                <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[650px]">
                  <div className="relative flex items-center justify-center">
                    <img
                      alt="Product gallery 1"
                      src="https://images.unsplash.com/photo-1580902394724-b08ff9ba7e8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
                      width={650}
                      height={590}
                      className="rounded-lg object-cover md:h-[300px] md:w-full lg:h-full"
                    />
                  </div>
                  <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                    {/* <ChevronLeft className="text-white" />
                    <ChevronRight className="text-white" /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
                <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">Nike Airmax Pro V2</h2>
                <p className="mt-4 font-semibold">$250</p>
              </div>
              <div className="mb-2 pt-0.5">
                <h4 className="text-15px mb-3 font-normal capitalize text-opacity-70">
                  available in:
                </h4>
                <ul className="flex flex-wrap space-x-2">
                  <li className="md:text-15px mb-2 flex h-9 cursor-pointer items-center justify-center rounded border p-1 px-3 text-sm font-medium transition duration-200 ease-in-out md:mb-3 md:h-10">
                    8 UK
                  </li>
                  <li className="md:text-15px mb-2 flex h-9 cursor-pointer items-center justify-center rounded border p-1 px-3 text-sm font-medium transition duration-200 ease-in-out md:mb-3 md:h-10">
                    9 UK
                  </li>
                  <li className="md:text-15px mb-2 flex h-9 cursor-pointer items-center justify-center rounded border p-1 px-3 text-sm font-medium transition duration-200 ease-in-out md:mb-3 md:h-10">
                    10 UK
                  </li>
                </ul>
              </div>
              <div className="pb-2" />
              <div className="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4">
                <button
                  type="button"
                  className="w-full rounded-md  bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add To Cart
                </button>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Heart size={16} className="mr-3" />
                    <span className="block">Wishlist</span>
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <Share size={16} className="mr-3" />
                      <span className="block">Share</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-6 xl:pt-8">
                <h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
                  Product Details:
                </h3>
                <p className="text-sm">
                  A chip (often just chip, or crisp in British and Irish English) may be a thin
                  slice of potato that has been either deep fried or baked until crunchy. theyre
                  commonly served as a snack, side dish, or appetizer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductOne