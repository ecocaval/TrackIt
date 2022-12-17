// libraries
import styled from "styled-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'

// components
import trackItLogo from "../assets/images/trackItLogo.png"
import axios from "axios"

// contexts

export default function Register() {

    const navigate = useNavigate()

    // register page
    const [userLoginRegister, setUserLoginRegister] = useState('')
    const [userPasswordRegister, setUserPasswordRegister] = useState('')
    const [userNameRegister, setUserNameRegister] = useState('')
    const [userImageRegister, setUserImageRegister] = useState('')
    const [sentRequestRegister, setSentRequestRegister] = useState(false)

    function sendLogin(e) {
        e.preventDefault()

        setSentRequestRegister(true)

        const registerURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"

        const registerMessageToSend = {
            email: userLoginRegister,
            name: userNameRegister,
            image: userImageRegister,
            password: userPasswordRegister

        }

        axios.post(registerURL, registerMessageToSend)
            .then(res => {
                console.log(res);
                navigate("/")
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
                    value={userLoginRegister}
                    type="email"
                    disabled={sentRequestRegister}
                    onChange={(e) => setUserLoginRegister(e.currentTarget.value)}
                    placeholder="email"
                />
                <input
                    value={userPasswordRegister}
                    type="password"
                    disabled={sentRequestRegister}
                    onChange={(e) => setUserPasswordRegister(e.currentTarget.value)}
                    placeholder="senha"
                />
                <input
                    value={userNameRegister}
                    type="text"
                    disabled={sentRequestRegister}
                    onChange={(e) => setUserNameRegister(e.currentTarget.value)}
                    placeholder="nome"
                />
                <input
                    value={userImageRegister}
                    type="url"
                    disabled={sentRequestRegister}
                    onChange={(e) => setUserImageRegister(e.currentTarget.value)}
                    placeholder="foto"
                />
                <button type="submit">
                    {sentRequestRegister ? <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#FFFFFF"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    /> : "Cadastrar"}
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
        display: flex;
        justify-content: center;
        align-items: center;
    }
`