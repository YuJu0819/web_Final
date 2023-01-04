import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  height: 45%;
  width: 50%
  margin: auto;
  opacity: 1;
`;
//  border: 1px solid gold; 

const Used = ({id}) => {
    const src  = require(`../../card/img/card${id}.png`);
    return(
        <Wrapper>
            <img src = {src} style = {{width: '100%', height: '100%'}}/>
        </Wrapper>
    );
}

export default Used;