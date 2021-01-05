import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { getListings } from "../services/QuizService";
import { QuizListing } from "./QuizListing";

export const QuizMain: React.FC = () => {
  const [activeListingIdx, setActiveListingIdx] = useState(0);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuizListings();
  }, []);

  // Promise .then
  // const getQuizListings = (): void => {
  //   setLoading(true);
  //   getListings()
  //     .then(({ data }: Listing[] | any) => {
  //       if (data.length > 0) {
  //         setListings(data);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((err: Error) => console.log(err));
  // };


  // Async Await 
  const getQuizListings = async (): Promise<void> => {
    setLoading(true)
    try {
      const response: AxiosResponse<Listing[]> = await getListings()
      const auctionListings: Listing[] = response.data
      auctionListings.length > 0 && setListings(auctionListings)
      setLoading(false)
    } catch (err: any) {
      console.log(err);
      setLoading(false)
    }
    
  }

  const handleNextAuction = (): void => {
    activeListingIdx+1 < listings.length && setActiveListingIdx(activeListingIdx +1)
  };

  return (
    <div>
      {!loading ? (
        <QuizListing
          listing={listings[activeListingIdx]}
          rounds={{ current: activeListingIdx + 1, total: listings.length }}
          nextAuction={handleNextAuction}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
