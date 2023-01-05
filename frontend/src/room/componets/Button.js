import styled from 'styled-components';
import { useRoom } from '../containers/hooks/useRoom';

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
    const { dropCard, useSkill } = useRoom();
    if(id === "drop"){
        return(
            <Wrapper>
                <Hover>
                    <div onClick={dropCard}>
                        {id}
                    </div>
                </Hover>
            </Wrapper>
        );
    }
    if(id === "skill"){
        return(
            <Wrapper>
                <Hover>
                    <div onClick={useSkill}>
                        {id}
                    </div>
                </Hover>
            </Wrapper>
        );
    }
}

export default Button;