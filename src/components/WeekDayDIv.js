import { useState } from "react"

// libraries
import styled from "styled-components"

export default function WeekDayDiv({ day, habitDays }) {

    const [weekButtonClicked, setWeekButtonClicked] = useState(false)

    if (habitDays.includes(day.weekDayNumber) && weekButtonClicked === false) {
        setWeekButtonClicked(true)
    }

    return (
        <StyledButton
            data-test="habit-day"
            weekButtonClicked={weekButtonClicked}
        >
            {day.initialLeter}
        </StyledButton>
    )
}

const StyledButton = styled.button`
    font-family: 'Lexend Deca'; 
    width: 30px;
    height: 30px;
    background: ${props => props.weekButtonClicked ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: ${props => props.weekButtonClicked ? "#FFFFFF" : "#DBDBDB"};
    margin-right: 5px;
`