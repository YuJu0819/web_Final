import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  height: 40%;
  flex-basis: 45%;
  flex-grow: 0;
  flex-shrink: 0;
  margin: auto;
  opacity: 1;
`;
//  border: 1px solid gold; 

const Hover = styled.div`
    height: 92.5%;
    width: 92.5%;
    &:hover {
        height: 100%;
        width: 100%;
    }
`

const Card = ({id, chooseACard}) => {
    //const url = "../img/cardtest.png"//"../img" + "/cardtest.png"
    const reqPngs = require.context( '../img/cards', true, /\.png$/ )
    const allPngFilePaths = reqPngs.keys()
    //根據ID查找本地圖片
    const imagePath = allPngFilePaths[id]
    const src = reqPngs(imagePath)
    return(
        <Wrapper>
            <Hover>
                <img src = {src} style = {{width: '100%', height: '100%'}} onClick = {()=>chooseACard(id)}/>
            </Hover>
        </Wrapper>
    );
}

export default Card;