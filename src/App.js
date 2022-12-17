// libraries
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

//components
import GlobalStyle from './styles/GlobalStyle';
import Login from './components/Login';
import Register from './components/Register';
import Habits from './components/Habits';
import Records from './components/Records';
import Today from './components/Today';

// contexts
import { ReceivedInfoContext } from './Contexts/ReceivedInfoContext';
import { HabitsPercentageContext } from './Contexts/HabitsPercentageContext';

function App() {

  const [userReceivedInfo, setUserReceivedInfo] = useState({})
  const [userHabitsPercentage, setUserHabitsPercentage] = useState(60)

  console.log(userReceivedInfo);

  return (
    <StyledMain>
      <GlobalStyle />
      <ReceivedInfoContext.Provider
        value={{ userReceivedInfo, setUserReceivedInfo }}
      >
        <HabitsPercentageContext.Provider
          value={{ userHabitsPercentage, setUserHabitsPercentage }}
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
        </HabitsPercentageContext.Provider>
      </ReceivedInfoContext.Provider>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  background: #E5E5E5;
  height: 100vh;
`

export default App;
