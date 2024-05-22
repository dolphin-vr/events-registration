import styled from "styled-components";

export const CenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BottomContainer = styled.div`
  /* position: absolute;
  bottom: 0;
  left: 50%; */
  width: 40px;
  height: 40px;
  transform: translateX(-50vw);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Circle = styled.div`
  width: 120px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat, conic-gradient(#0000 30%, #ffa516);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
  @keyframes l13 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
