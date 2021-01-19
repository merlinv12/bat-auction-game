import React, { useState, useEffect } from "react";
import styled from "styled-components";

const RoundsHeader = styled.h3`
  color: green;
  min-width: 0;
  min-height: auto;
  flex: 0 1 auto;
`;

const QuizContainer = styled.div`
  width: 80vw;
  min-width: 400px;
  min-height: 800px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  `;
  
const ListingContainer = styled.div`
  box-shadow: 0 0 0 1px rgb(0 0 0/.05), 0 4px 16px rgb(0 0 0/.1);
  border-radius: 24px;
  padding: 30px;
`;

const ImageInfoContainer = styled.div`
  max-width: 600px;
`;
const ListingImage = styled.img`
  height: auto;
  max-width: 100%;
`;

type QuizListingProps = {
  listing: Listing;
  rounds: Rounds;
  nextAuction: () => void;
  showSummary: () => void;
};

export const QuizListing: React.FC<QuizListingProps> = ({
  listing,
  nextAuction,
  rounds,
  showSummary,
}) => {
  const [guessSubmited, setGuessSubmitted] = useState(false);
  const [guessValue, setGuessValue] = useState(0);
  const {
    date,
    _id,
    images: { main },
    location: { city, zip },
    listingUrl,
    price,
    title,
  } = listing;

  // Resets the Guessing State when a new listing is loaded.
  useEffect(() => {
    console.log("Next Auction...");
    setGuessValue(0);
    setGuessSubmitted(false);
  }, [_id]);

  return (
    <QuizContainer>
      <RoundsHeader>
        {`Round: ${rounds.current} / ${rounds.total}`}
      </RoundsHeader>
      <ListingContainer>
        <h2>{title}</h2>
        <div>
          <div>
            <b>{`Sold On: ${date}`}</b>
          </div>
          <div>
            <b>
              {`Location: ${city}, ${zip}`}
            </b>
          </div>
        </div>
        <ImageInfoContainer>
          <ListingImage src={main + '?w=620'} alt='main'></ListingImage>
        </ImageInfoContainer>

        {guessSubmited ? (
          <div>
            <p>
              Actual Price: ${price},{" "}
              <a href={listingUrl} target='_blank' rel='noreferrer'>
                Click here to see the listing
              </a>
            </p>
            {rounds.current === rounds.total ? (
              <button onClick={showSummary}>Summary</button>
            ) : (
              <button onClick={nextAuction}>Next</button>
            )}
          </div>
        ) : (
          <React.Fragment>
            <input
              type='number'
              value={guessValue}
              placeholder='$0'
              required
              min='1'
              onChange={(e) => setGuessValue(parseInt(e.target.value))}
            />
            <button onClick={() => setGuessSubmitted(true)}>Guess</button>
          </React.Fragment>
        )}

      </ListingContainer>
    </QuizContainer>
  );
};
