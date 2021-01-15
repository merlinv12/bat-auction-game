import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { getListings } from "../services/QuizService";
import { QuizListing } from "./QuizListing";
import { QuizSummary } from "./QuizSummary";

type QuizMainProps = {
  quizLength: number;
};

export const QuizMain: React.FC<QuizMainProps> = ({ quizLength }) => {
  const [activeListingIdx, setActiveListingIdx] = useState(0);
  const [displaySummary, setDisplaySummary] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuizListings(quizLength);
    // eslint-disable-next-line
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
  //     .catch((err: string ) => console.log(err));
  // };

  // Async Await
  const getQuizListings = async (limit: number) => {
    setLoading(true);
    try {
      const response: AxiosResponse<Listing[]> = await getListings(limit);
      const auctionListings: Listing[] = response.data;
      auctionListings.length > 0 && setListings(auctionListings);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextAuction = (): void => {
    activeListingIdx + 1 < listings.length &&
      setActiveListingIdx(activeListingIdx + 1);
  };

  const handleDisplaySummary = (): void => {
    activeListingIdx + 1 === listings.length && setDisplaySummary(true);
  };

  return (
    <div>
      {!loading ? (
        displaySummary ? (
           <QuizSummary listings={listings} />
        ) : (
          <QuizListing
            listing={listings[activeListingIdx]}
            rounds={{ current: activeListingIdx + 1, total: listings.length }}
            nextAuction={handleNextAuction}
            showSummary={handleDisplaySummary}
          />
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
