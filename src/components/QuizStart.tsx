import React, { useState } from "react";
import styled from "styled-components";
import { QuizMain } from "./QuizMain";

const FullScreenContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  box-shadow: 0 0 0 1px rgb(0 0 0/.05), 0 4px 16px rgb(0 0 0/.1);
  border-radius: 24px;
  padding: 20px;
  width: 600px;
  flex: 0 1 auto;
`;

// Define optional props
const FlexRow = styled.div<{ order?: number }>`
  order: ${(props) => props.order || 0};
`;

const StartQuiz: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [quizLength, setQuizLength] = useState(3);

  return (
    <FullScreenContainer>
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
            <span>
              Number of Listings:
              <input
                type='number'
                value={quizLength}
                required
                min='1'
                max='10'
                onChange={(e) => setQuizLength(parseInt(e.target.value))}
              />
            </span>
            <button onClick={() => setGameStarted(true)}>Start</button>
          </FlexRow>
        </FlexContainer>
      ) : (
          <QuizMain quizLength={quizLength} />
      )}
    </FullScreenContainer>
  );
};

export default StartQuiz;
