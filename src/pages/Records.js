import { useEffect, useState } from "react"

// libraries
import styled from "styled-components"
import dayjs from "dayjs"

// components
import UserHeader from "../components/UserHeader"
import UserMenu from "../components/UserMenu"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import axios from "axios"


export default function Record() {

    const [date, setDate] = useState(new Date());
    const [recordsInfo, setRecordsInfo] = useState([])

    console.log(recordsInfo);

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

    return (
        <RecordWrapper>
            <UserHeader />
            <RecordHeader>
                <h2>Histórico</h2>
                <Calendar
                    onChange={setDate}
                    value={date}
                    locale="pt-BR"
                    maxDate={new Date()}
                    formatDay={(_, date) => dayjs(date).format('D')} />
            </RecordHeader>
            <UserMenu />
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
`
