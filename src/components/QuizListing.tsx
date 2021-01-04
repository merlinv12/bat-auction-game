import React, { useState, useEffect } from "react";
import styled from "styled-components";

const RoundsHeader = styled.h3`
  color: green;
  min-width: 0;
  min-height: auto;
  flex: 0 1 auto;
`

const QuizContainer = styled.div`
  width: 80vw;
  min-width: 400px;
  min-height: 800px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`

const ImageInfoContainer = styled.div`
  max-width: 600px;
`
const ListingImage = styled.img`
  height: auto;
  max-width: 100%;
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

  // Resets the Guessing State when a new listing is loaded.
  useEffect(() => {
    console.log("Next Auction...");
    setGuessValue(0);
    setGuessSubmitted(false);
  }, [listing.id]);

  const {title, price, date, listingLocation: {city, zip}, listingImages: {main}} = listing;

  return (
    <QuizContainer>
      <RoundsHeader>
        Round: {rounds.current + ' / ' + rounds.total}
      </RoundsHeader>
      <h2>{title}</h2>
      <div>
        <div><b>Sold On: {date}</b></div> 
        <div><b>Location: {city}, {zip}</b></div>
      </div>
      <ImageInfoContainer>
        <ListingImage src={main} alt='main'></ListingImage>
      </ImageInfoContainer>

      {guessSubmited ? (
        rounds.current === rounds.total ? (
          <button>Summary</button>
        ) : (
          <div>
            <p>Actual Price: ${price}</p>    
            <button onClick={nextAuction}>Next</button>
          </div>
        )
      ) : (
        <React.Fragment>
          <input
            type='number'
            value={guessValue}
            placeholder='$0'
            required
            min='1'
            onChange={(e) => setGuessValue(parseInt(e.target.value))}
          ></input>
          <button onClick={() => setGuessSubmitted(true)}>Guess</button>
        </React.Fragment>
      )}
    </QuizContainer>
  );
};
