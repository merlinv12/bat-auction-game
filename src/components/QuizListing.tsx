import { totalmem } from "os";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ListingImages } from './ListingImages'
import { ListingInfo } from './ListingInfo';


const QuizContainer = styled.div`
  width: 80vw;
  /* min-width: 700px;
  min-height: 500px; */
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  `;
  
const RoundsHeader = styled.h3`
  color: green;
  min-width: 0;
  min-height: auto;
  flex: 0 1 auto;
`;

const ListingContainer = styled.div`
  box-shadow: 0 0 0 1px rgb(0 0 0/.05), 0 4px 16px rgb(0 0 0/.1);
  border-radius: 24px;
`;

const ListingImagesInfoContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-flow: row nowrap;
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
    _id,
    price,
    listingUrl,
    title,
    images: { main, extra },
  } = listing;

  // Resets the Guessing State when a new listing is loaded.
  useEffect(() => {
    setGuessValue(0);
    setGuessSubmitted(false);
  }, [_id]);

  let images = [main, ...extra]

  return (
    <QuizContainer>
      <RoundsHeader>
        {`Round: ${rounds.current} / ${rounds.total}`}
      </RoundsHeader>
      <ListingContainer>
        <h2 style={{textAlign: 'center', marginBottom: 0}}>{title}</h2>
        <ListingImagesInfoContainer>
          <ListingImages images={images} _id={_id}/>
          <ListingInfo listing={listing}/>
        </ListingImagesInfoContainer>
      </ListingContainer>

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
    </QuizContainer>
  );
};
