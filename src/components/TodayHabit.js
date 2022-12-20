// libraries
import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components"

// contexts
import { HabitsContext } from "../Contexts/HabitsContext";
import { ReceivedInfoContext } from "../Contexts/ReceivedInfoContext";

// images
import checkMark from "./../assets/images/check-mark.png"

export default function TodayHabit({ todayHabitInfo, habitsQuantity, habitsConcluded, setHabitsConcluded }) {

    const { config } = useContext(ReceivedInfoContext)

    const { setUserHabitsPercentage } = useContext(HabitsContext)

    const [habitWasConcluded, setHabitWasConcluded] = useState(todayHabitInfo.done)

    function concludeHabit() {
        const checkHabitUrl = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${todayHabitInfo.id}/check`

        const uncheckHabitUrl = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${todayHabitInfo.id}/uncheck`

        if (!habitWasConcluded) {
            setHabitWasConcluded(!habitWasConcluded)
            if (!habitsConcluded.includes(todayHabitInfo.name)) {
                setHabitsConcluded([...habitsConcluded, todayHabitInfo.name])
                setUserHabitsPercentage(((habitsConcluded.length + 1) / habitsQuantity) * 100)
                axios.post(checkHabitUrl, {}, config)
                    .catch(err => console.error(err))
            }
        } else {
            setHabitWasConcluded(!habitWasConcluded)
            const newHabitsConcluded = habitsConcluded.filter((habit) => {
                if (habit === todayHabitInfo.name) {
                    return false
                }
                return true
            })
            setHabitsConcluded(newHabitsConcluded)
            setUserHabitsPercentage(((habitsConcluded.length - 1) / habitsQuantity) * 100)
            axios.post(uncheckHabitUrl, {}, config)
                .catch(err => console.error(err))
        }
    }

    return (
        <TodayHabitWrapper data-test="today-habit-container">
            <span>
                <HabitInfo
                    habitWasConcluded={habitWasConcluded}
                    isEqual={todayHabitInfo.currentSequence === todayHabitInfo.highestSequence}
                >
                    <h3 data-test="today-habit-name">
                        {todayHabitInfo.name}
                    </h3>
                    <CurrentSequence data-test="today-habit-sequence">
                        <p>Sequencia atual:</p>
                        <p>{todayHabitInfo.currentSequence} dias</p>
                    </CurrentSequence>
                    <span data-test="today-habit-record">
                        <p>Seu recorde:</p>
                        <p>{todayHabitInfo.highestSequence} dias</p>
                    </span>
                </HabitInfo>
                <CheckButton
                    data-test="today-habit-check-btn"
                    habitWasConcluded={habitWasConcluded}
                    onClick={concludeHabit}
                >
                    <img src={checkMark} />
                </CheckButton>
            </span>
        </TodayHabitWrapper>
    )
}

const TodayHabitWrapper = styled.div`
    box-sizing: border-box;
    padding: 10px;
    width: 340px;
    margin: auto;
    background: #FFFFFF;
    border-radius: 5px;
    > span {
        display: flex;
        justify-content: space-between;
    }
`

const HabitInfo = styled.div`
    > h3 {
        font-family: 'Lexend Deca';
        font-size: 20px;
        color: #666666;
        margin-top: 5px;
    }
    > span {
        display: flex;
        > p {
            font-family: 'Lexend Deca';
            font-size: 13px;
            margin-top: 5px;
            color: #666666;
        }
        > p:nth-child(2) {
            margin-left: 5px;
            color: ${props => props.habitWasConcluded && props.isEqual ? "#8FC549" : "#666666"};
        }
    }
`

const CurrentSequence = styled.span`
    display: flex;
    > p {
        font-family: 'Lexend Deca';
        font-size: 13px;
        margin-top: 5px;
        color: #666666;
    }
    > p:nth-child(2) {
        margin-left: 5px;
        color: ${props => props.habitWasConcluded ? "#8FC549" : "#666666"};
    }
`

const CheckButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.habitWasConcluded ? "#8FC549" : "#EBEBEB"};
    width: 69px;
    height: 69px;
    border-radius: 5px;
`