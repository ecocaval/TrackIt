import { useContext } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom"
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// contexts
import { HabitsPercentageContext } from "../Contexts/HabitsPercentageContext"

export default function UserMenu() {

    const { userHabitsPercentage } = useContext(HabitsPercentageContext)

    return (
        <UserMenuWrapper>
            <Link to="/habitos">Hábitos</Link>
            <TodayCircle>
                <Link to="/hoje">
                    <CircularProgressbarWithChildren
                        value={userHabitsPercentage}
                        styles={buildStyles({
                            strokeLinecap: 'round',
                            pathTransitionDuration: 2,
                            pathTransition: "none",
                            pathColor: `#FFFFFF`,
                            textColor: '#FFFFFF',
                            trailColor: 'rgba(0, 0, 0, 0)',
                            backgroundColor: '#52B6FF',
                        })}>
                            <p>Hoje</p>
                        </CircularProgressbarWithChildren>
                </Link>
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
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    border-radius: 90px;
    background: #52B6FF;
    margin-top: -40px;
    > a {
        text-decoration: none;
        padding: 4px;
    }
    p {
        font-family: 'Lexend Deca';
        font-size: 18px;
        text-align: center;
        color: #FFFFFF;
    }
`