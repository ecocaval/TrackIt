import { useEffect, useState } from "react"

// libraries
import styled from "styled-components"
import dayjs from "dayjs"

// components
import UserHeader from "../components/UserHeader"
import UserMenu from "../components/UserMenu"
import Calendar from 'react-calendar'
import axios from "axios"

export default function Record() {

    const [date, setDate] = useState(new Date());
    const [recordsInfo, setRecordsInfo] = useState([])

    const config = {
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userInfo')).token
        }
    }

    useEffect(() => {
        const recordsUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily"

        axios.get(recordsUrl, config)
            .then(res => {
                setRecordsInfo(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    function formatDay(date) {
        const daySimpleFormat = dayjs(date).format('D')
        const dateToAnalyze = dayjs(date).format('DD/MM/YYYY')

        for (let i = 0; i < recordsInfo.length; i++) {

            if (recordsInfo[i].day === dateToAnalyze) {

                let completedDaysCounter = 0
                const habitsToAnalyze = recordsInfo[i].habits

                for (let j = 0; j < habitsToAnalyze.length; j++) {

                    if (habitsToAnalyze[j].done) {
                        completedDaysCounter++
                    }
                }

                if (completedDaysCounter === habitsToAnalyze.length) {
                    return <CompleteDay>{daySimpleFormat}</CompleteDay>
                } else {
                    return <MissingDay>{daySimpleFormat}</MissingDay>
                }
            }
        }
        return daySimpleFormat
    }

    console.log(recordsInfo);

    return (
        <RecordWrapper>
            <UserHeader />
            <RecordHeader>
                <div>
                    <h2>Histórico</h2>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        locale="pt-BR"
                        maxDate={new Date()}
                        formatDay={(_, date) => formatDay(date)} />
                </div>
            </RecordHeader>
            <RecordFooter>
                <SubtitlesItem>
                    <CompleteDay />
                    <p>Todos os hábitos foram completados</p>
                </SubtitlesItem>
                <SubtitlesItem>
                    <MissingDay />
                    <p>Faltam hábitos para completar</p>
                </SubtitlesItem>
                <SubtitlesItem>
                    <SelectedDay />
                    <p>Indicação de dia selecionado</p>
                </SubtitlesItem>
                <SubtitlesItem>
                    <CurrentDay />
                    <p>Indicação de dia atual</p>
                </SubtitlesItem>
            </RecordFooter>
            <UserMenu />
        </RecordWrapper>
    )
}

const RecordWrapper = styled.main`
    margin-top: 70px;
    height: calc(100% - 140px);
    overflow-y: scroll;
    background: #F2F2F2;
    
    .react-calendar {
        width: 350px;
        max-width: 100%;
        background: white;
        border: 1px solid #a0a096;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
    }
    .react-calendar--doubleView {
        width: 700px;
    }
    .react-calendar--doubleView .react-calendar__viewContainer {
        display: flex;
        margin: -0.5em;
    }
    .react-calendar--doubleView .react-calendar__viewContainer > * {
        width: 50%;
        margin: 0.5em;
    }
    .react-calendar,
    .react-calendar *,
    .react-calendar *:before,
    .react-calendar *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .react-calendar button {
        margin: 0;
        border: 0;
        outline: none;
    }
    .react-calendar button:enabled:hover {
        cursor: pointer;
    }
    .react-calendar__navigation {
        display: flex;
        height: 44px;
        margin-bottom: 1em;
    }
    .react-calendar__navigation button {
        min-width: 44px;
        background: none;
    }
    .react-calendar__navigation button:disabled {
        background-color: #f0f0f0;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #e6e6e6;
    }
    .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.75em;
    }
    .react-calendar__month-view__weekdays__weekday {
        padding: 0.5em;
    }
    .react-calendar__month-view__weekNumbers .react-calendar__tile {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75em;
        font-weight: bold;
    }
    .react-calendar__month-view__days__day--weekend {
        color: #d10000;
    }
    .react-calendar__month-view__days__day--neighboringMonth {
        color: #757575;
    }
    .react-calendar__year-view .react-calendar__tile,
    .react-calendar__decade-view .react-calendar__tile,
    .react-calendar__century-view .react-calendar__tile {
        padding: 2em 0.5em;
    }
    .react-calendar__tile {
        max-width: 100%;
        padding: 10px 6.6667px;
        background: none;
        text-align: center;
        line-height: 16px;
    }
    .react-calendar__tile:disabled {
        background-color: #f0f0f0;
    }
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background-color: #e6e6e6;
    }
    .react-calendar__tile--now {
        background: #ffff76;
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #ffffa9;
    }
    .react-calendar__tile--hasActive {
        background: #FFFFFF;
    }
    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
        background: #a9d4ff;
    }
    .react-calendar__tile--active {
        background: #006edc;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: #1087ff;
    }
    .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #e6e6e6;
    }

`

const RecordHeader = styled.div`
    margin: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
        width: 80%;
        > h2 {
            font-family: 'Lexend Deca';
            font-size: 23px;
            color: #126BA5;
            margin: auto 0px;
            margin-bottom: 20px;
        }
    } 
`

const RecordFooter = styled.footer`
    width: 310px;
    margin: auto;
    > div {
        display: flex;
        align-items: center;
        margin-top: 1.2em;
        > p {
            margin-left: 1em;
        }
    }
`

const SubtitlesItem = styled.div`
    background-color: #D5D5D2;
    padding: 10px;
    border-radius: 7px;
    border: 1px solid #a0a096;
    > p {
        font-family: 'Lexend Deca';
        font-size: 13px;
        margin-top: 5px;
        color: #000000;
    }
`

const CompleteDay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33px;
    height: 34px;
    background-color: #71C46C;
    border-radius: 16.5px;
`

const MissingDay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33px;
    height: 34px;
    background-color: #C47B6C;
    border-radius: 16.5px;
`

const SelectedDay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33px;
    height: 34px;
    background-color: #006edc;
`

const CurrentDay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33px;
    height: 34px;
    background-color: #ffff76;
`
