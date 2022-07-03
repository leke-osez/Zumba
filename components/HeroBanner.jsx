import React from "react";
import Link from "next/link";
import { UrlFor } from "../lib/client";

const HeroBanner = ({ herobanner }) => {
  return (
    <div className="hero-banner-container">
      <p className="beats-solo">{herobanner.smallText}</p>
      <h3> {herobanner.midText}</h3>
      <h1>{herobanner.largeText1}</h1>
      <img
        src={UrlFor(herobanner.image)}
        alt="headphones"
        className="hero-banner-image"
      />

      <Link href={`/product/${herobanner.product}`}>
        <button type="button">{herobanner.buttonText}</button>
      </Link>
      <div className="desc">
        <h5>Description</h5>
        <p>{herobanner.desc}</p>
      </div>
    </div>
  );
};

export default HeroBanner;
