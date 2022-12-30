import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  height: 9%;
  flex-basis: 44%;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 25px;
  margin: auto;
  opacity: 1;
  font-size: 4vh;
  font-family: 'Futura';
  font-weight: 900;
  color: white;
  background-color: grey;
`;
//  border: 1px solid gold; 

const Hover = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    margin: auto;
    &:hover {
        font-size: 5vh;
    }
`

const Button = ({id}) => {
    return(
        <Wrapper>
            <Hover>
                {id}
            </Hover>
        </Wrapper>
    );
}

export default Button;