// libraries
import styled from "styled-components"
import { useContext } from "react";

// contexts 
import { ReceivedInfoContext } from "../Contexts/ReceivedInfoContext"

export default function UserHeader() {

    const { userReceivedInfo } = useContext(ReceivedInfoContext)

    console.log(userReceivedInfo);

    return (
        <UserHeaderWrapper>
            <p>TrackIt</p>
            <img src={userReceivedInfo.image}/>
        </UserHeaderWrapper>
    )   
}

const UserHeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    height: 70px;
    left: 0px;
    top: 0px;
    > p {
        font-family: 'Playball';
        font-size: 39px;
        color: #FFFFFF;
    }
    > img {
        width: 51px;
        height: 51px;
        background: url(image.png);
        border-radius: 98.5px;
    }
`