// libraries
import styled from "styled-components"
import { useState } from "react"
import { Link } from "react-router-dom"

// components
import trackItLogo from "../assets/images/trackItLogo.png"
import axios from "axios"

export default function Register() {

    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [userImage, setUserImage] = useState('')
    const [sentRequest, setSentRequest] = useState(false)

    console.log(userLogin);
    console.log(userPassword);

    function sendLogin(e) {
        e.preventDefault()
        
        setSentRequest(true)
        
        const registerURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        
        const registerMessageToSend = {
            email: userLogin,
            name: userName,
            image: userImage,
            password: userPassword
            
        }

        axios.post(registerURL, registerMessageToSend)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <StyledHeader>
                <img src={trackItLogo} />
            </StyledHeader>
            <StyledForm onSubmit={(e) => sendLogin(e)}>
                <input
                    value={userLogin}
                    type="email"
                    disabled={sentRequest}
                    onChange={(e) => setUserLogin(e.currentTarget.value)}
                    placeholder="email"
                />
                <input
                    value={userPassword}
                    type="password"
                    disabled={sentRequest}
                    onChange={(e) => setUserPassword(e.currentTarget.value)}
                    placeholder="senha"
                />
                <input
                    value={userName}
                    type="text"
                    disabled={sentRequest}
                    onChange={(e) => setUserName(e.currentTarget.value)}
                    placeholder="nome"
                />
                <input
                    value={userImage}
                    type="url"
                    disabled={sentRequest}
                    onChange={(e) => setUserImage(e.currentTarget.value)}
                    placeholder="foto"
                />
                <button type="submit">
                    Cadastrar
                </button>
                <Link to="/">
                    Já tem uma conta? Faça login!
                </Link>
            </StyledForm>
        </>
    )
}

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
    > img {
        width: 180px;
        height: 180px;
    }
`

const StyledForm = styled.form`
    font-family: 'Lexend Deca';
    display: flex;
    flex-direction: column;
    align-items: center;
    > input {
        box-sizing: border-box;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        margin-bottom: 10px;
        width: 303px;
        height: 45px;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 20px;
        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #DBDBDB;
            opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #DBDBDB;
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
            color: #DBDBDB;
        }
    }
    > a {
        margin-top: 10px;
        color: #52B6FF;
        font-size: 14px;
        text-align: center;
    }
    > button {
        background: #52B6FF;
        color: #FFFFFF;
        width: 303px;
        height: 45px;
        border: none;
        border-radius: 5px;
        font-size: 21px;
        text-align: center;
    }
`