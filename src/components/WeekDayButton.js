import { useState } from "react"

// libraries
import styled from "styled-components"

export default function WeekDayButton({ day, selectedDays, setSelectedDays, requestWasSent }) {

    const [weekButtonClicked, setWeekButtonClicked] = useState(false)

    if (requestWasSent && weekButtonClicked) {
        setWeekButtonClicked(false)
    }

    return (
        <StyledButton
            data-test="habit-day"
            disabled={requestWasSent}
            weekButtonClicked={weekButtonClicked}
            onClick={() => {
                setWeekButtonClicked(!weekButtonClicked)
                setSelectedDays([...selectedDays, day.weekDayNumber])
            }}>
            {day.initialLeter}
        </StyledButton>
    )
}

const StyledButton = styled.button`
    font-family: 'Lexend Deca';
    margin-right: 5px;
    width: 30px;
    height: 30px;
    background: ${props => props.weekButtonClicked ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: ${props => props.weekButtonClicked ? "#FFFFFF" : "#DBDBDB"};
`