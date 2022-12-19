import { useState } from "react"
import styled from "styled-components"

export default function WeekDayButton({day, selectedDays, setSelectedDays, requestWasSent}) {
    
    const [weekButtonClicked, setWeekButtonClicked] = useState(false)

    if(requestWasSent && weekButtonClicked) {
        setWeekButtonClicked(false)
    }

    return (
        <StyledButton 
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
    width: 30px;
    height: 30px;
    background: ${props => props.weekButtonClicked ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: ${props => props.weekButtonClicked ? "#FFFFFF" : "#DBDBDB"};
`