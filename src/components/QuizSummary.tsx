import React from "react";
import styled from "styled-components";
import { RoundShadowBorder } from "./QuizListing";
import { StyledButton } from "./QuizStart";

const SummaryContainer = styled.div`
  width: 80vw;
  /* min-width: 700px;
  min-height: 500px; */
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const SummaryItemContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row nowrap;
`;

const SummaryInfo = styled.div`
  line-height: 1.6em;
  font-size: 0.8em;
  font-weight: bold;
  margin-left: 20px;
`;

type QuizSummaryProps = {
  listings: Listing[];
  userGuesses: UserGuess[];
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuizSummary: React.FC<QuizSummaryProps> = ({
  listings,
  setGameStarted,
  userGuesses,
}) => {
  return (
    <SummaryContainer>
      <RoundShadowBorder>
        {listings.map((listing, idx) => (
          <QuizSummaryItem
            key={listing._id}
            listing={listing}
            guessValue={userGuesses[idx].guessValue}
          />
        ))}
      </RoundShadowBorder>
      <StyledButton
        style={{ marginTop: "20px" }}
        onClick={() => setGameStarted(false)}
      >
        Start Over
      </StyledButton>
    </SummaryContainer>
  );
};

const GuessDifference = styled.div<{ overValue: boolean }>`
  color: ${(props) => (props.overValue ? "green" : "red")};
`;

type QuizSummaryItemProps = {
  listing: Listing;
  guessValue: number;
};

const QuizSummaryItem: React.FC<QuizSummaryItemProps> = ({
  listing,
  guessValue,
}) => (
  <SummaryItemContainer>
    <div>
      <img src={`${listing.images.main}?w=250`} alt='summary'></img>
    </div>
    <SummaryInfo>
      <div style={{ fontSize: "1.2em" }}>{listing.title}</div>
      <div>{`Price: $${listing.price}`}</div>
      <div>{`Guess: $${guessValue}`}</div>
      {listing.price >= guessValue ? (
        <GuessDifference overValue={false}>{`- $${
          listing.price - guessValue
        }`}</GuessDifference>
      ) : (
        <GuessDifference overValue={true}>{`+ $${
          guessValue - listing.price
        }`}</GuessDifference>
      )}
      <div>
        <a href={listing.url}>View Auction</a>
      </div>
    </SummaryInfo>
  </SummaryItemContainer>
);
