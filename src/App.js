// libraries
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

//components
import GlobalStyle from './styles/GlobalStyle';
import Login from './components/Login';
import Register from './components/Register';
import Habits from './components/Habits';
import UserHeader from "./components/UserHeader"

// contexts
import { LoginContext } from './Contexts/LoginContext'
import { RegisterContext } from './Contexts/RegisterContext';
import { ReceivedInfoContext } from './Contexts/ReceivedInfoContext';

function App() {

  const [userReceivedInfo, setUserReceivedInfo] = useState({})

  // register page
  const [userLoginRegister, setUserLoginRegister] = useState('')
  const [userPasswordRegister, setUserPasswordRegister] = useState('')
  const [userNameRegister, setUserNameRegister] = useState('')
  const [userImageRegister, setUserImageRegister] = useState('')
  const [sentRequestRegister, setSentRequestRegister] = useState(false)

  // login page
  const [userLoginLogin, setUserLoginLogin] = useState('')
  const [userPasswordLogin, setUserPasswordLogin] = useState('')
  const [sentRequestLogin, setSentRequestLogin] = useState(false)

  console.log(userReceivedInfo);

  return (
    <StyledMain>
      <GlobalStyle />
      <LoginContext.Provider
        value={{
          userLoginLogin, setUserLoginLogin,
          userPasswordLogin, setUserPasswordLogin,
          sentRequestLogin, setSentRequestLogin
        }}
      >
        <RegisterContext.Provider
          value={{
            userLoginRegister, setUserLoginRegister,
            userPasswordRegister, setUserPasswordRegister,
            userNameRegister, setUserNameRegister,
            userImageRegister, setUserImageRegister,
            sentRequestRegister, setSentRequestRegister
          }}
        >
          <ReceivedInfoContext.Provider
            value={{ userReceivedInfo, setUserReceivedInfo }}
          >
            {userReceivedInfo.name && <UserHeader/>}
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
                  path="/habits"
                  element={<Habits />}
                />
              </Routes>
            </BrowserRouter>
          </ReceivedInfoContext.Provider>
        </RegisterContext.Provider>
      </LoginContext.Provider>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  background: #E5E5E5;
  height: 100vh;
`

export default App;
