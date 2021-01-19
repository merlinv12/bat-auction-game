import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ImageCaroselContainer = styled.div<{ width?: number; height?: number }>`
  overflow: hidden;
  background-color: #000;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
`;

const SwipeContainer = styled.div`
  display: flex;
  overflow-x: visible;
  transition-property: transform;
  will-change: transform;
`;

const ImageContain = styled.img`
  object-fit contain;
  height: 100%;
  width: 100%;
`;

const MoveButton = styled.button`
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0;
  outline: none;
`;

const IMG_WIDTH = 620;
const IMG_HEIGHT = 400;

type ListingImagesProps = {
  images: string[];
  _id: string;
};

export const ListingImages: React.FC<ListingImagesProps> = ({ images, _id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movement, setMovement] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(`0s`);

  let lastTouch = 0;
  const maxLength = images.length - 1;
  let transitionTimeOut: ReturnType<typeof setTimeout>;
  let wheelTimeOut: ReturnType<typeof setTimeout>;

  useEffect(()=> {
    setCurrentIndex(0)
    setMovement(0)
  }, [_id])

  const handleWheelChange = (e: any) => {
    clearTimeout(wheelTimeOut);
    handleMovement(e.deltaX);
    wheelTimeOut = setTimeout(() => handleMovementEnd(), 100);
  };

  const handleMovement = (delta: any) => {
    let nextMove = movement + delta;

    if (nextMove < 0) {
      nextMove = 0;
    }
    if (nextMove > maxLength * IMG_WIDTH) {
      nextMove = maxLength * IMG_WIDTH;
    }

    setMovement(nextMove);
  };

  const handleMovementEnd = () => {
    const endPos = movement / IMG_WIDTH;
    const endPartial = endPos % 1;
    const endIndex = endPos - endPartial;
    const deltaInt = endIndex - currentIndex;
    let nextIndex = endIndex;
    console.log("next INdex", nextIndex);

    if (deltaInt >= 0) {
      if (endPartial >= 0.1) {
        nextIndex += 1;
      }
    } else if (deltaInt < 0) {
      nextIndex = currentIndex - Math.abs(deltaInt);
      if (endPartial > 0.9) {
        nextIndex += 1;
      }
    }

    if (nextIndex !== currentIndex) {
      transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));
    }
  };

  const handleTouchStart = (e: any) => {
    lastTouch = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchMove = (e: any) => {
    const delta = lastTouch - e.nativeEvent.touches[0].clientX;

    handleMovement(delta);
  };

  const handleTouchEnd = () => {
    lastTouch = 0;
  };

  const transitionTo = (index: number, duration: number) => {
    setCurrentIndex(index);
    setMovement(index * IMG_WIDTH);
    setTransitionDuration(`${duration}s`);
    transitionTimeOut = setTimeout(
      () => setTransitionDuration("0s"),
      duration * 100
    );
  };

  useEffect(() => {
    return () => {
      clearTimeout(transitionTimeOut);
    };
  });

  return (
    <ImageCaroselContainer
      onWheel={handleWheelChange}
      width={IMG_WIDTH}
      height={IMG_HEIGHT}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <SwipeContainer
        style={{
          transform: `translateX(${movement * -1}px)`,
          transitionDuration: transitionDuration,
        }}
      >
        {images &&
          images.map((img) => {
            return (
              <ImageContain
                key={img}
                src={`${img}?w=${IMG_WIDTH}`}
                alt='listing image'
              ></ImageContain>
            );
          })}
      </SwipeContainer>
      {currentIndex < maxLength && (
        <MoveButton
          onClick={() => {
            transitionTo(currentIndex + 1, 0.5);
          }}
          style={{ right: "5px" }}
        >
          →
        </MoveButton>
      )}
      {currentIndex > 0 && (
        <MoveButton
          onClick={() => {
            transitionTo(currentIndex - 1, 0.5);
          }}
          style={{ left: "5px" }}
        >
          ←
        </MoveButton>
      )}
    </ImageCaroselContainer>
  );
};
