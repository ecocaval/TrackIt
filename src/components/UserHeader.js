// libraries
import styled from "styled-components"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GoArrowLeft } from "react-icons/go";
import { IconContext } from "react-icons";

// contexts 
import { ReceivedInfoContext } from "../Contexts/ReceivedInfoContext"

export default function UserHeader() {

    const { userReceivedInfo, setUserReceivedInfo } = useContext(ReceivedInfoContext)

    const navigate = useNavigate()

    if (userReceivedInfo.token === undefined) {
        setUserReceivedInfo(JSON.parse(localStorage.getItem('userInfo')))
    }

    function logout() {
        navigate("/")
        localStorage.removeItem("userInfo");
    }

    return (
        <UserHeaderWrapper data-test="header">
            <p>TrackIt</p>
            <UserHeaderRight>
                <IconContext.Provider value={{ color: "white", size: "2em" }}>
                    <GoArrowLeft onClick={logout}/>
                </IconContext.Provider>
                <img src={userReceivedInfo.image} />
            </UserHeaderRight>
        </UserHeaderWrapper>
    )
}

const UserHeaderWrapper = styled.header`
    box-sizing: border-box;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    width: 100vw;
    height: 70px;
    left: 0px;
    top: 0px;
    > p {
        font-family: 'Playball';
        font-size: 39px;
        color: #FFFFFF;
    }
`

const UserHeaderRight = styled.div`
    display: flex ;
    justify-content: center;
    align-items: center;
    > img {
        width: 51px;
        height: 51px;
        background: url(image.png);
        border-radius: 98px;
        margin-left: 1em;
    }
`