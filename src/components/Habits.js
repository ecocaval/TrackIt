// libraries
import { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"

// components
import WeekDayButton from "./WeekDayButton"
import WeekDayDiv from "./WeekDayDIv"
import UserHeader from "./UserHeader"
import UserMenu from "./UserMenu"

import { HabitsContext } from "../Contexts/HabitsContext"
import { ReceivedInfoContext } from "../Contexts/ReceivedInfoContext"

import trashCan from "./../assets/images/trash-can.png"

export default function Habits() {

    const [addButtonWasClicked, setAddButtonWasClicked] = useState(false)
    const [requestWasSent, setRequestWasSent] = useState(false)
    const [habitName, setHabitName] = useState('')
    const [selectedDays, setSelectedDays] = useState([])
    const weekDaysArray = [
        {
            initialLeter: 'D',
            weekDay: "domingo",
            weekDayNumber: 1,
        },
        {
            initialLeter: 'S',
            weekDay: "segunda",
            weekDayNumber: 2,
        },
        {
            initialLeter: 'T',
            weekDay: "terca",
            weekDayNumber: 3,
        },
        {
            initialLeter: 'Q',
            weekDay: "quarta",
            weekDayNumber: 4,
        },
        {
            initialLeter: 'Q',
            weekDay: "quinta",
            weekDayNumber: 5,
        },
        {
            initialLeter: 'S',
            weekDay: "sexta",
            weekDayNumber: 6,
        },
        {
            initialLeter: 'S',
            weekDay: "sabado",
            weekDayNumber: 7,
        }]
    const { userHabits, setUserHabits } = useContext(HabitsContext)
    const { userReceivedInfo } = useContext(ReceivedInfoContext)

    const newHabit = {
        name: habitName,
        days: selectedDays
    }

    const config = {
        headers: {
            "Authorization": "Bearer " + userReceivedInfo.token
        }
    }

    function saveHabit() {
        const postHabitUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"

        setRequestWasSent(true)

        axios.post(postHabitUrl, newHabit, config)
            .then(response => {
                setAddButtonWasClicked(!addButtonWasClicked)
                setSelectedDays([])
                getHabits()
                setRequestWasSent(false)
                setHabitName("")
            })
            .catch(err => {
                console.log(err)
                alert("Seu hábito não foi criado! Tente novamente...")
            })
    }

    function getHabits() {
        const getHabitUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"

        axios.get(getHabitUrl, config)
            .then(response => {
                setUserHabits(response.data)
            })
            .catch(err => console.log(err))
    }

    function deleteHabit(habitId) {

        if (window.confirm('Você realmente deseja deletar este hábito?')) {

            const deleteHabitUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/" + habitId

            axios.delete(deleteHabitUrl, config)
                .then(response => {
                    console.log(response)
                    getHabits()
                })
                .catch(err => console.log(err))

        }
    }

    useEffect(getHabits, [])

    return (
        <HabitsWrapper>
            <UserHeader />
            <HabitsSection>
                <span>
                    <p>Meus hábitos</p>
                    <button
                        data-test="habit-create-btn"
                        onClick={() => setAddButtonWasClicked(!addButtonWasClicked)}
                    >
                        +
                    </button>
                </span>
                <HabitSection
                    addButtonWasClicked={addButtonWasClicked}
                    data-test="habit-create-container"
                >
                    <input
                        type="text"
                        value={habitName}
                        onChange={(e) => setHabitName(e.currentTarget.value)}
                        placeholder="nome do hábito"
                        disabled={requestWasSent}
                        data-test="habit-name-input"
                    />
                    <WeekDaysWrapper>
                        {weekDaysArray.map((day, i) => (
                            <WeekDayButton
                                key={i}
                                day={day}
                                selectedDays={selectedDays}
                                setSelectedDays={setSelectedDays}
                                requestWasSent={requestWasSent}
                                disabled={requestWasSent}
                            />
                        ))}
                    </WeekDaysWrapper>
                    <ButtonsWrapper>
                        <CancelButton
                            data-test="habit-create-cancel-btn"
                            onClick={() => {
                                setAddButtonWasClicked(!addButtonWasClicked)
                            }}
                        >
                            Cancelar
                        </CancelButton>
                        <SaveButton
                            data-test="habit-create-save-btn"
                            onClick={saveHabit}
                        >
                            Salvar
                        </SaveButton>
                    </ButtonsWrapper>
                </HabitSection>
                {!userHabits[0] && (
                    <NoHabitsText>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabitsText>
                )}
                <UserMenu />
            </HabitsSection>
            {userHabits[0] && (
                userHabits.map((habit,i) => (
                    <Habit data-test="habit-container" key={i} >
                        <header>
                            <p data-test="habit-name">{habit.name}</p>
                            <img
                                data-test="habit-delete-btn" 
                                src={trashCan}
                                onClick={() => deleteHabit(habit.id)}
                            />
                        </header>
                        {weekDaysArray.map((day, i) => (
                            <WeekDayDiv
                                key={i}
                                day={day}
                                habitDays={habit.days}
                            />
                        ))}
                    </Habit>
                ))
            )}
        </HabitsWrapper>
    )
}

const HabitsWrapper = styled.main`
    margin-top: 70px;
    height: calc(100% - 140px);
    overflow-y: scroll;
`

const HabitsSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    > span {
        width: 80%;
        display: flex;
        justify-content: space-between;  
        margin: 20px 0px;
        > p {
            font-family: 'Lexend Deca';
            font-size: 23px;
            color: #126BA5;
            margin: auto 0px;
        }
        > button {
            width: 40px;
            height: 35px;
            border: none;
            background: #52B6FF;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-size: 27px;
            text-align: center;
            color: #FFFFFF;
        }
    }
`

const HabitSection = styled.section`
    display: ${props => props.addButtonWasClicked ? "flex" : "none"};
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

const Habit = styled.div`
    box-sizing: border-box;
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 0px auto;
    margin-bottom: 20px;
    padding: 15px;
    > header {
        display: flex;
        justify-content: space-between;
        > p {
            font-family: 'Lexend Deca';
            margin-bottom: 10px;
            font-size: 20px;
            color: #666666;
        }
        > img {
            width: 13px;
            height: 15px;
        }
    }
`