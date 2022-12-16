import { useState } from "react"
import UserHeader from "./UserHeader"
import styled from "styled-components"

import WeekDayButton from "./WeekDayButton"

export default function Habits({ userReceivedInfo }) {

    const [buttonWasClicked, setButtonWasClicked] = useState(false)
    const [habitName, setHabitName] = useState('')
    const [userHabits, setUserHabits] = useState([])
    const weekDaysArray = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

    return (
        <>
            <UserHeader userReceivedInfo={userReceivedInfo} />
            <HabitsSection>
                <span>
                    <p>Meus hábitos</p>
                    <button onClick={() => setButtonWasClicked(!buttonWasClicked)}>
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
                        <WeekDaysWrapper>
                            {weekDaysArray.map((day, i) => (
                                <WeekDayButton key={i}>
                                    {day}
                                </WeekDayButton>
                            ))}
                        </WeekDaysWrapper>
                        <ButtonsWrapper>
                            <CancelButton>Cancelar</CancelButton>
                            <SaveButton>Salvar</SaveButton>
                        </ButtonsWrapper>
                    </HabitSection>
                ) : (<></>)}
                {userHabits[0] ? (<></>) : (
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
        width: 80%;
        display: flex;
        justify-content: space-between;  
        margin: 20px 0px;
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
            font-family: 'Lexend Deca';
            font-size: 27px;
            text-align: center;
            color: #FFFFFF;
        }
    }
`

const HabitSection = styled.section`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    width: 340px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 20px;
    > input {
        font-family: 'Lexend Deca';
        box-sizing: border-box;
        font-size: 20px;
        padding: 0 20px;
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #DBDBDB;
            opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #DBDBDB;
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
            color: #DBDBDB;
        }
    }
    
`

const WeekDaysWrapper = styled.span`
    margin: 20px 0;
    margin-left: -90px;
    > button {
        font-family: 'Lexend Deca';
        width: 30px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        color: #DBDBDB;
    }
`

const NoHabitsText = styled.text`
    font-family: 'Lexend Deca';
    font-size: 18px;
    color: #666666;
    padding: 0px 40px;
    margin-top: 20px;
`

const ButtonsWrapper = styled.span`
    width: fit-content;
`

const CancelButton = styled.button`
    font-family: 'Lexend Deca';
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #52B6FF;
    background: none;
    border: none;
`

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 5px;
    border: none;   
    font-family: 'Lexend Deca';
    font-size: 16px;
    text-align: center;
    color: #FFFFFF;
    margin-left: 20px;
    margin-right: -120px;
`