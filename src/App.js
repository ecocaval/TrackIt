// libraries
import { useState } from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';

//components
import GlobalStyle from './styles/GlobalStyle';
import Login from './components/Login';
import Register from './components/Register';
import Habits from './components/Habits';

function App() {
  
  const [userReceivedInfo, setUserReceivedInfo] = useState({})

  console.log(userReceivedInfo);

  return (
    <>
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
    </>
  );
}

export default App;
