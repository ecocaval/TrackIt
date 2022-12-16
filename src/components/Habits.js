import { useState } from "react"
import UserHeader from "./UserHeader"
import styled from "styled-components"

export default function Habits({ userReceivedInfo }) {

    const [buttonWasClicked, setButtonWasClicked] = useState(false)
    const [habitName, setHabitName] = useState('')
    const [userHabits, setUserHabits] = useState([])
    const weekDaysArray = ['D','S','T','Q','Q','S','S']

    return (
        <>
            <UserHeader userReceivedInfo={userReceivedInfo} />
            <HabitsSection>
                <span>
                    <p>Meus hábitos</p>
                    <button onClick={() => setButtonWasClicked(true)}>
                        +
                    </button>
                </span>
                {buttonWasClicked ? (
                    <HabitSection>
                        <input
                            type="text"
                            value={habitName}
                            onChange={(e) => setHabitName(e.currentTarget.value)}
                            placeholder="nome do hábito"
                        />
                        <WeekDays>
                            {weekDaysArray.map((day, i) => (
                                <button key={i}>{day}</button>
                            ))}
                        </WeekDays>
                    </HabitSection>
                ) : (
                    <></>
                )}
                {userHabits[0] ? (
                    <></>
                ) : (
                    <NoHabitsText>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabitsText>
                )}

            </HabitsSection>
        </>
    )
}

const HabitsSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    > span {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        > p {
            font-family: 'Lexend Deca';
            font-size: 23px;
            color: #126BA5;
        }
        > button {
            width: 40px;
            height: 35px;
            border: none;
            background: #52B6FF;
            border-radius: 4.63636px;
        }
    }

`

const HabitSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 340px;
    background: #FFFFFF;
    border-radius: 5px;
`

const WeekDays = styled.span`

`

const NoHabitsText = styled.text`
    font-family: 'Lexend Deca';
    font-size: 18px;
    color: #666666;
    padding: 0px 20px;
`