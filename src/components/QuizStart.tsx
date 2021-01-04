import React, { useState } from "react";
import styled from "styled-components";
import { QuizMain } from "./QuizMain";

const FullScreenContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

// Define optional props
const FlexRow = styled.div<{ order?: number }>`
  order: ${(props) => props.order || 0};
`;

const StartQuiz: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <FullScreenContainer>
      {/* HTML attributes including inline CSS style properties are defined in react types index file*/}
      <h1 style={{ textAlign: "center" }}>Bring A Trailer Auction Quiz</h1>
      {!gameStarted ? (
        <FlexContainer>
          <FlexRow>
            <p>
              Bring-a-trailer is a car auction website where car enthusiasts
              buy, sell and discuss their favorite cars.<br></br>
              Test your knowledge by guessing the prices of completed auctions.
            </p>
          </FlexRow>
          <FlexRow>
            <button onClick={() => setGameStarted(true)}>Start</button>
          </FlexRow>
        </FlexContainer>
      ) : (
          <QuizMain />
      )}
    </FullScreenContainer>
  );
};

export default StartQuiz;
