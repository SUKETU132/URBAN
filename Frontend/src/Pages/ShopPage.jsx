import React from 'react'
import Firstpage from '../components/firstpage/Firstpage'
import PopulerInWomen from '../components/Populer/PopulerInWomen';
import ExclusiveOfferBanner from '../components/ExclusiveOffer/ExclusiveOfferBanner';
import NewCollection from '../components/NewCollection/NewCollection';

const ShopPage = () => {
  return (
    <section>
      <div>
        <div>
          <Firstpage />
        </div>
        <div className='w-full flex'>
          <PopulerInWomen />
        </div>
        <div>
          <NewCollection />
        </div>
      </div>
    </section>
  )
}

export default ShopPage
