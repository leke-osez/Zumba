import React from 'react';
import {FooterBanner, Product, HeroBanner} from '../components'
import { client } from '../lib/client';

const Home = ({productsData, bannerData}) => {
  console.log(productsData)
  return (
    <>
      <HeroBanner herobanner = {bannerData.length && bannerData[0]}/>
      <div className='products-heading'>
        <h2 >Best selling product</h2>
        <p>Audio gadgets</p>
      </div>

      <div className='products-container'>

        {productsData?.map((product)=> (
          <Product product = {product} key= {product._id}/>
          ))}
      </div>

      <FooterBanner bannerData = {bannerData && bannerData[0]}/>
    </>
  )
}
export const getServerSideProps = async ()=>{
  const productsQuery = '*[_type == "product"]'
  const productsData = await client.fetch(productsQuery)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData =await client.fetch(bannerQuery)

  return {
    props: {productsData, bannerData}
  }
}

export default Home
