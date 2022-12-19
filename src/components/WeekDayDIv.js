import { useState } from "react"
import styled from "styled-components"

export default function WeekDayDiv({day, habitDays}) {
    
    const [weekButtonClicked, setWeekButtonClicked] = useState(false)

    console.log(day);
    console.log(habitDays);

    if(habitDays.includes(day.weekDayNumber) && weekButtonClicked===false) {
        setWeekButtonClicked(true)
    }

    return (
        <StyledButton weekButtonClicked={weekButtonClicked}>
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
`