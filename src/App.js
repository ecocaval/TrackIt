// libraries
import { useState } from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import styled from 'styled-components';

//components
import GlobalStyle from './styles/GlobalStyle';
import Login from './components/Login';
import Register from './components/Register';
import Habits from './components/Habits';

function App() {
  
  const [userReceivedInfo, setUserReceivedInfo] = useState({})

  console.log(userReceivedInfo);

  return (
    <StyledMain>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login setUserReceivedInfo={setUserReceivedInfo}/>}
          />
          <Route
            path="/cadastro"
            element={<Register/>}
          />
          <Route
            path="/habits"
            element={<Habits userReceivedInfo={userReceivedInfo}/>}
          />
        </Routes>
      </BrowserRouter>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  background: #E5E5E5;
  height: 100vh;
`

export default App;
