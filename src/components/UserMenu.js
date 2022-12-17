import styled from "styled-components"
import { Link } from "react-router-dom"

export default function UserMenu() {

    return (
        <UserMenuWrapper>
            <Link to="/habitos">Hábitos</Link>
            <TodayCircle>
                <div>
                    <Link to="/hoje">Hoje</Link>
                </div>
            </TodayCircle>
            <Link to="/historico">Histórico</Link>
        </UserMenuWrapper>
    )
}

const UserMenuWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    position: fixed;
    width: 100vw;
    height: 70px;
    left: 0;
    bottom: 0;
    background: #FFFFFF;
    > a {
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #52B6FF;
        text-decoration: none;
    }
`

const TodayCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    border-radius: 90px;
    background: #52B6FF;
    margin-top: -40px;
    > div {
        > a {
            font-family: 'Lexend Deca';
            font-size: 18px;
            text-align: center;
            color: #FFFFFF;
            text-decoration: none;
        }
    }
`