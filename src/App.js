import { createGlobalStyle } from "styled-components";

import Metronome from "./components/Metronome/Metronome";
import Timer from "./components/Timer/Timer";

import ExercisesEditor from "./components/ExercisesEditor/ExercisesEditor";
import StyledFormWrapper from "./components/styles/styled-components/StyledFormWrapper";
import StyledHeader from "./components/styles/styled-components/StyledHeader";

const GlobalStyle = createGlobalStyle`
html{
  height: fit-content;
  
}
body{
  font-family: 'Gemini Moon';
  background: linear-gradient(to right, #fffbd5, #b20a2c);
  height: fit-content;
  margin: 0;
  color: #555;
  
 }

button:hover {
  transition-duration: 1000ms;
  background-color: #b20a2c;
  border-radius: 70%;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledHeader>Shred It up</StyledHeader>
      <StyledFormWrapper>
        <ExercisesEditor />
        <Timer />
        <Metronome />
      </StyledFormWrapper>
    </>
  );
}

export default App;
