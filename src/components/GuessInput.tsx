import React from "react";
import styled from "styled-components";
import gavel from "../assets/gavel.svg";
import gavelDown from "../assets/gavel-down-hover.svg";

const GuessInputContainer = styled.div`
  display: flex;
  position: relative;
  height: 50px;
  margin-top: 20px;
  place-content: center;
`;

const StyledGuessInput = styled.input`
  font-size: 24px;
  padding: 9px 0px;
  border-right: none;
  border-image: initial;
  width: 165px;
  border-bottom: 2px solid rgb(0, 0, 0);
  border-left: 2px solid rgb(0, 0, 0);
  border-top: 2px solid rgb(0, 0, 0);
  text-align: center;
  border-radius: 0px;
  height: 50px;
  box-sizing: border-box;
  outline: none !important;

  // Removes Incrementing arrows in inputbox
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const GuessButton = styled.button`
  width: 46px;
  height: 100%;
  background: url(${gavel}) center center / 30px 30px no-repeat rgb(0, 0, 0);
  display: inline-block;
  border: none;
  position: relative;
  cursor: pointer;
  outline: none;
  padding: 0px;
  &:hover {
    background: url(${gavelDown}) center center / 30px 30px no-repeat
      rgb(0, 0, 0);
  }
`;

type GuessInputProps = {
  guess: number;
  setGuessValue: any;
  setGuessSubmitted: any;
};
export const GuessInput: React.FC<GuessInputProps> = ({
  guess,
  setGuessSubmitted,
  setGuessValue,
}) => {
  const handleGuessChange = (e: any) => {
    let value = e.target.value;
    setGuessValue(parseInt(value));
  };

  const handleGuessSubmit = (e: any) => {
      if (guess === 0) return
      setGuessSubmitted(true)
  }

  return (
    <GuessInputContainer>
      <StyledGuessInput
        type='number'
        placeholder='$0'
        min='1'
        required
        onChange={handleGuessChange}
      ></StyledGuessInput>
      <GuessButton onClick={handleGuessSubmit}></GuessButton>
    </GuessInputContainer>
  );
};
