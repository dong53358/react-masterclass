import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  width: 98vw;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  background-color: ${(props) => props.bgColor};
`;

const Circle = styled(Box)`
  border-radius: 100px;
`;

function App() {
  return (
    <Wrapper>
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
    </Wrapper>
  );
}

export default App;
