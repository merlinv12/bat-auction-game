import React, { useState, useEffect } from "react";
import { getListings } from "../services/QuizService";
import { QuizListing } from "./QuizListing";

export const QuizMain: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeListingIdx, setActiveListingIdx] = useState(0);

  useEffect(() => {
    getQuizListings();
  }, []);

  const getQuizListings = (): void => {
    setLoading(true);
    getListings()
      .then(({ data }: Listing[] | any) => {
        if (data.length > 0) {
          setListings(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => console.log(err));
  };

  const handleNextAuction = (): void => {
    if (activeListingIdx+1 < listings.length) {
      setActiveListingIdx(activeListingIdx + 1);
    }
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
