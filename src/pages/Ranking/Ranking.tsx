// Libraries
import { useEffect, useState } from "react";

// Images
import collectionImage from "../../assets/images/createselector1.png";

// SASS
import "./Ranking.scss";

// Components
import RankingSwitcher from "./RankingSwitcher";
import RankingHeader from "./RankingHeader";
import RankingTable from "./RankingTable";
import BlueBackground from "../../components/BlueBackground/BlueBackground";

// Ranking Page
const Ranking = () => {
  const [timeFilter, setTimeFilter] = useState(7);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [chainFilter, setChainFilter] = useState("all");

  const items = [
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 1,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 2,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 3,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 4,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 5,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
    {
      id: 6,
      collection: "CryptoPunks",
      volume: "133,871.43",
      h24: -48.31,
      d7: 13690.9,
      floorPrice: 133,
      owners: "3.2",
      assets: "10.0",
      image: collectionImage,
    },
  ];

  const [displayItems, setDisplayItems] = useState(
    items.slice(0, Math.min(items.length, 30))
  );

  // Current Range
  const [currRangeStart, setCurrRangeStart] = useState(0);
  const [currRangeEnd, setCurrRangeEnd] = useState(Math.min(30, items.length));

  const updateRankingList = (start:number, end:number) => {
    setCurrRangeStart(start);
    setCurrRangeEnd(end);
  };

  useEffect(() => {
    setDisplayItems(items.slice(currRangeStart, currRangeEnd));
  }, [currRangeStart, currRangeEnd]);

  return (
    <div className="ranking">
      <BlueBackground />
      <RankingHeader
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        chainFilter={chainFilter}
        setChainFilter={setChainFilter}
      />
      <RankingTable items={displayItems} currRangeStart={currRangeStart} />
      <RankingSwitcher
        length={items.length}
        currRangeStart={currRangeStart}
        currRangeEnd={currRangeEnd}
        updateRankingList={updateRankingList}
      />
    </div>
  );
};

export default Ranking;