import { useContext, useState } from "react";
import styled from "styled-components"

import { HabitsContext } from "../Contexts/HabitsContext";

import checkMark from "./../assets/images/check-mark.png"

export default function TodayHabit({ todayHabitInfo, habitsQuantity, habitsConcluded, setHabitsConcluded }) {

    const { userHabitsPercentage, setUserHabitsPercentage } = useContext(HabitsContext)

    const [habitWasConcluded, setHabitWasConcluded] = useState(false)

    function concludeHabit() {
        if (!habitWasConcluded) {
            setHabitWasConcluded(!habitWasConcluded)
            if (!habitsConcluded.includes(todayHabitInfo.name)) {
                setHabitsConcluded([...habitsConcluded, todayHabitInfo.name])
                setUserHabitsPercentage(((habitsConcluded.length + 1) / habitsQuantity) * 100)
            }
        } else {
            setHabitWasConcluded(!habitWasConcluded)
            const newHabitsConcluded = habitsConcluded.filter((habit) => {
                if(habit === todayHabitInfo.name) {
                    return false
                }
                return true
            })
            setHabitsConcluded(newHabitsConcluded)
            setUserHabitsPercentage(((habitsConcluded.length - 1) / habitsQuantity) * 100)
        }
    }

    return (
        <TodayHabitWrapper>
            <span>
                <HabitInfo>
                    <h3>{todayHabitInfo.name}</h3>
                    <p>Sequencia atual: {todayHabitInfo.currentSequence} dias</p>
                    <p>Seu recorde: {todayHabitInfo.highestSequence} dias</p>
                </HabitInfo>
                <CheckButton
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
    > p {
        font-family: 'Lexend Deca';
        font-size: 13px;
        margin-top: 5px;
        color: #666666;
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