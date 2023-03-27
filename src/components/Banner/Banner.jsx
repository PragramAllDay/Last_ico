import React, {useEffect, useState} from "react";
import shape01 from "../../assets/img/banner/banner_shape01.png";
import shape02 from "../../assets/img/banner/banner_shape02.png";
import shape03 from "../../assets/img/banner/banner_shape03.png";
import fireIcon from "../../assets/img/icon/fire.png";
import CountDownOne from "../CountDown/CountDownOne";
import { BlockChainData } from "../../lib/hooks/LoadBlockChainData";

const Banner = (props) => {
  const [completion, setCompletion] = useState(false);
  console.log(completion);
  const [totalCollectedAmount, setTotalCollectedAmount] = useState(null);
   BlockChainData( setTotalCollectedAmount );
   const [percentageRaised, setPercentageRaised] = useState(0);
   useEffect (() => {
    if (totalCollectedAmount) {
      const target = 12500000; 
      const percentage = ((totalCollectedAmount / target) * 100).toFixed(2);
      setPercentageRaised(percentage);
    }
    }, [totalCollectedAmount]);

  return (
    <section className="banner-area banner-bg">
      <div className="banner-shape-wrap">
        <img src={shape01} alt="" className="img-one" />
        <img src={shape02} alt="" className="img-two" />
        <img src={shape03} alt="" className="img-three" />
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="banner-content text-center">
              <img src={fireIcon} alt="" />
              <h2 className="title">
                Future is now <span>LAST</span> Trading
                Strategies
              </h2>
            </div>
            <div className="banner-progress-wrap">
              <ul>
                <li>Pre Sell</li>
                <li>Soft Cap</li>
                <li>Bonus</li>
              </ul>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${percentageRaised}%` }}
                  aria-valuenow={percentageRaised}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
              <h4 className="title">
              {percentageRaised}% target raised{" "} <span>1 LAST = 0.3 USDT {totalCollectedAmount} LAST</span>
              </h4>
            </div>
          </div>
        </div>
        {/* <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="banner-countdown-wrap text-center">
              <h2 className="title">{ completion ? "ICO has started" : "ICO Will Start In.."}</h2>

              <CountDownOne setCompletion= {setCompletion} />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Banner;
