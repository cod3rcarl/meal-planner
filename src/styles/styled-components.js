import styled, { css } from "styled-components";
import background from "../assets/background.jpeg";

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid gold;
  color: gold;
  margin: 0 1em;
  padding: 0.25em 1em;
  ${(props) =>
    props.primary &&
    css`
      background: black;
      color: gold;
    `};
`;

export const Container = styled.div`
  background: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.main &&
    css`
      height: 100%;
    `};
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  margin: 0;

  ${({ overlay, main }) => {
    switch (true) {
      case overlay:
        return `color: bisque;
      padding: 1rem;
      margin: 1rem;
      height:90%;
      justify-content: center;
      font-family: var(--primary-font);
      background-color: rgba(3, 3, 3, 0.603)`;

      case main:
        return `font-size: 2rem;
        margin-top: 1rem; 
        `;
      default:
    }
  }}
`;

export const Heading = styled.h1`
  margin: 0;
`;

export const Text = styled.p`
  margin: 1rem;
  text-align: center;
`;

export const StyledTextField = styled.input`
width: 60%;
height: 30px;
border-radius:20px;


${(props) =>
  props.empty &&
  css`
    color: none;
    backgroundcolor: white;
  `}


${(props) =>
  props.active &&
  css`
    color: black;
    backgroundcolor: whitesmoke;
  `}


${(props) =>
  props.filled &&
  css`
    color: black;
    backgroundcolor: white;
    border: 5px solid green;
  `}
`;
