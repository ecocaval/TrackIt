// components
import styled from "styled-components"
import UserHeader from "./UserHeader"
import UserMenu from "./UserMenu"


export default function Record() {
    return(
        <RecordWrapper>
            <UserHeader/>
                <RecordHeader>
                    <h2>Histórico</h2>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </RecordHeader>
            <UserMenu/>
        </RecordWrapper>
    )
}

const RecordWrapper = styled.main`
    margin-top: 70px;
    height: calc(100% - 140px);
    overflow-y: scroll;
    background: #F2F2F2;
`

const RecordHeader = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 20px;
    > h2 {
        font-family: 'Lexend Deca';
        font-size: 23px;
        color: #126BA5;
        margin: auto 0px;
        margin-bottom: 20px;
    }
    > p {
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #666666;
    }
`
