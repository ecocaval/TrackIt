// libraries
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

//components
import GlobalStyle from './styles/GlobalStyle';
import Login from './pages/Login';
import Register from './pages/Register';
import Habits from './pages/Habits';
import Records from './pages/Records';
import Today from './pages/Today';

// contexts
import { ReceivedInfoContext } from './Contexts/ReceivedInfoContext';
import { HabitsContext } from './Contexts/HabitsContext';

function App() {

  const [userReceivedInfo, setUserReceivedInfo] = useState({})
  const [userHabitsPercentage, setUserHabitsPercentage] = useState(0)
  const [userHabits, setUserHabits] = useState([])
  const [habitNameToAdd, setHabitNameToAdd] = useState("")
  const [habitSelectedDaysToAdd, setHabitSelectedDaysToAdd] = useState([])

  const config = {
    headers: {
      "Authorization": "Bearer " + userReceivedInfo.token
    }
  }

  return (
    <StyledMain>
      <GlobalStyle />
      <ReceivedInfoContext.Provider
        value={{ userReceivedInfo, setUserReceivedInfo, config }}
      >
        <HabitsContext.Provider
          value={{ userHabitsPercentage, setUserHabitsPercentage, userHabits, setUserHabits, habitNameToAdd, setHabitNameToAdd, habitSelectedDaysToAdd, setHabitSelectedDaysToAdd }}
        >
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Login />}
              />
              <Route
                path="/cadastro"
                element={<Register />}
              />
              <Route
                path="/hoje"
                element={<Today />}
              />
              <Route
                path="/habitos"
                element={<Habits />}
              />
              <Route
                path="/historico"
                element={<Records />}
              />
            </Routes>
          </BrowserRouter>
        </HabitsContext.Provider>
      </ReceivedInfoContext.Provider>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  background: #FFFFFF;
  height: 100vh;
`

export default App;
