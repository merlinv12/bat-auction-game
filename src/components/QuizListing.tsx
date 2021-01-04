import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ListingImage = styled.img`
  object-fit: cover;
  height: 400px;
  width: 100%;
`;

type QuizListingProps = {
  listing: Listing;
  rounds: Rounds;
  nextAuction: () => void;
};

export const QuizListing: React.FC<QuizListingProps> = ({
  listing,
  rounds,
  nextAuction,
}) => {
  const [guessValue, setGuessValue] = useState(0);
  const [guessSubmited, setGuessSubmitted] = useState(false);

  useEffect(() => {
    console.log("Next Auction...");
    setGuessValue(0);
    setGuessSubmitted(false);
  }, [listing.id]);

  return (
    <div>
      <h3>
        Round: {rounds.current} / {rounds.total}{" "}
      </h3>
      <h2>{listing.title}</h2>
      <ListingImage src={listing.listingImages.main} alt='main'></ListingImage>
      <h4>Sold On: {listing.date}</h4>
      <h4>Location: {listing.listingLocation.city}</h4>
      {guessSubmited ? (
        rounds.current === rounds.total ? (
          <button>Summary</button>
        ) : (
          <button onClick={nextAuction}>Next</button>
        )
      ) : (
        <React.Fragment>
          <input
            type='number'
            value={guessValue}
            placeholder='$0'
            required
            min='0'
            onChange={(e) => setGuessValue(parseInt(e.target.value))}
          ></input>
          <button onClick={() => setGuessSubmitted(true)}>Guess</button>
        </React.Fragment>
      )}
    </div>
  );
};
