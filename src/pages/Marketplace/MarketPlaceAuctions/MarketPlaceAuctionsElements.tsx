// Libs
import { useEffect, useState } from "react";

// Some utils
import getTime from "./getTime";

// Images
import verified from "../../../assets/svgs/verified.svg";
import useExplorer from "../useExplorer";
import { useNavigate } from "react-router-dom";
import { getNftContractAddress } from "../../../utils/utils";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

const getTimeString = (days, hours, minutes) => {
  return `${days}d ${hours}h ${minutes}m`;
};

// Element for the list
const Element = ({ element, currentType }) => {
  // Need to keep updating time string as per clock
  // so need to use setInterval
  // const { days, hours, minutes } = getTime(new Date().getTime(), element.date);
  // const [timeString, setTimeString] = useState(
  //   getTimeString(days, hours, minutes)
  // );
  // useEffect(() => {
  //   // Check every second
  //   setInterval(() => {
  //     const { days, hours, minutes } = element.auctionTimer.getTime();
  //     setTimeString(getTimeString(days, hours, minutes));
  //   }, 1000);
  // }, []);
  return (
    <div className="market-place-auction-element">
      <div className="nft-image-size">
        <img src={element.cloudinaryUrl} alt={element.name} /></div>
      <h2 className="name">{element.name}</h2>
      <p className="seller-name">
        {element.sellerInfo}{" "}
        {element.ifVerified ? <img src={verified} alt="Verified" /> : null}
      </p>
      <div className="info">
        <span className="type">{currentType}</span>
        {/* {currentType == "live" && <span className="time">Ends in {element.auctionStartOn}</span>}
        {currentType == "upcoming" && <span className="time">Starts in {element.auctionStartOn}</span>} */}
      </div>
    </div>
  );
};

const MarketPlaceAuctionsElements = ({ list, currentScroll,currentType }) => {
  // const holderRef = useExplorer(currentScroll);
  const navigate = useNavigate()
  return (
    <Swiper 
      modules={[Navigation, Pagination]}  
      className="market-place-auctions-elements"
      navigation={{
        prevEl: '#auction-nav-left',
        nextEl: '#auction-nav-right'
      }}
      breakpoints={{
        320: {
            slidesPerView: 1,
        },
        900: {
            slidesPerView: 2,
        },
        1250: {
            slidesPerView: 3,
        },
    }}
      // pagination={{ clickable: true }}
      >
      {list.map((element: any, i: number) => (
        <SwiperSlide
          onClick={()=>navigate(`/nft/${element.chain}/${getNftContractAddress(
              element
            )}/${element.tokenId}`,
      )}
        >
          <Element
            element={element}
            key={`mpae${i}${element.tokenId}`}
            currentType={currentType}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MarketPlaceAuctionsElements;
