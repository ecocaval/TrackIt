// components
import UserHeader from "../components/UserHeader"
import UserMenu from "../components/UserMenu"
import TodayHabit from "../components/TodayHabit"
import Loader from "../components/Loader"

// libraries
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import axios from "axios"

// contexts
import { HabitsContext } from "../Contexts/HabitsContext"

export default function Today() {

    require("dayjs/locale/pt-br")

    const { userHabitsPercentage, setUserHabitsPercentage } = useContext(HabitsContext)
    const [todayHabits, setTodayHabits] = useState([])
    const [habitsConcluded, setHabitsConcluded] = useState([]);
    const [infoWasReceived, setInfoWasReceived] = useState(false)
    const [noHabitsConcluded, setNoHabitsConcluded] = useState(true)

    let currentDay = dayjs().locale('pt-BR').format(`dddd, DD/MM`)
    currentDay = setFirstLetterToUpper(currentDay)

    function setFirstLetterToUpper(currentDay) {
        currentDay = Array.from(currentDay)
        currentDay[0] = currentDay[0].toUpperCase()
        currentDay = currentDay.join("")
        return currentDay
    }

    const config = {
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userInfo')).token
        }
    }

    useEffect(() => {
        const todayGetUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"

        axios.get(todayGetUrl, config)
            .then(res => {
                setTodayHabits(res.data)

                let habitsConcludedAux = (res.data).filter((habit) => {
                    if (habit.done) {
                        return true
                    }
                    return false
                })

                habitsConcludedAux = habitsConcludedAux.map((habit) => {
                    return habit.name
                })

                setHabitsConcluded([...habitsConcludedAux])

                setUserHabitsPercentage((habitsConcludedAux.length / res.data.length) * 100)

                setNoHabitsConcluded(habitsConcludedAux.length === 0)

                setInfoWasReceived(true)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <TodayWrapper>
            <UserHeader />
            {infoWasReceived ? (
                <TodaySection noHabitsConcluded={noHabitsConcluded}>
                    <TodayHeader>
                        <h2 data-test="today">{currentDay}</h2>
                        <p data-test="today-counter">{(!userHabitsPercentage) ? ("Nenhum hábito concluído ainda") : (`${userHabitsPercentage.toFixed(0)}% dos hábitos concluídos`)}</p>
                    </TodayHeader>
                    <TodayHabitsSection>
                        {todayHabits[0] !== undefined && (todayHabits.map((todayHabit, i) => (
                            <div key={i}>
                                <TodayHabit
                                    todayHabitInfo={todayHabit}
                                    habitsQuantity={todayHabits.length}
                                    habitsConcluded={habitsConcluded}
                                    setHabitsConcluded={setHabitsConcluded}
                                />
                            </div>
                        )))}
                    </TodayHabitsSection>
                </TodaySection>) : (
                <Loader />
            )}
            <UserMenu />
        </TodayWrapper>
    )
}

const TodayWrapper = styled.main`
    background: #F2F2F2;
    margin-top: 70px;
    height: calc(100% - 140px);
    overflow-y: scroll;
`

const TodaySection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`

const TodayHeader = styled.div`
    width: 340px;
    margin: 20px 0px;
    > h2 {
        font-family: 'Lexend Deca';
        font-size: 23px;
        color: #126BA5;
        margin: auto 0px;
        margin-bottom: 10px;
    }
    > p {
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: ${props => props.noHabitsConcluded ? "#BABABA" : "#8FC549"}
    }
`

const TodayHabitsSection = styled.section`
    > div {
        margin-bottom: 10px;
    }
`
