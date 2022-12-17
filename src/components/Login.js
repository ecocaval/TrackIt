// libraries
import styled from "styled-components"
import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'

// components
import trackItLogo from "../assets/images/trackItLogo.png"
import axios from "axios"

//contexts
import { ReceivedInfoContext } from "../Contexts/ReceivedInfoContext"


export default function Login() {

      // login page
    const [userLoginLogin, setUserLoginLogin] = useState('')
    const [userPasswordLogin, setUserPasswordLogin] = useState('')
    const [sentRequestLogin, setSentRequestLogin] = useState(false)
    const { setUserReceivedInfo } = useContext(ReceivedInfoContext)

    const navigate = useNavigate()

    function sendLogin(e) {
        e.preventDefault()

        setSentRequestLogin(true)

        const loginURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"

        const loginMessageToSend = {
            email: userLoginLogin,
            password: userPasswordLogin
        }

        axios.post(loginURL, loginMessageToSend)
            .then(res => {
                console.log(res.data)
                setUserReceivedInfo(res.data)
                setSentRequestLogin(false)
                navigate("/habits")
            })
            .catch(err => {
                console.log(err)
                alert("Seu login não foi encontrado... Tente novamente")
                setSentRequestLogin(false)
            })
    }

    return (
        <>
            <StyledHeader>
                <img src={trackItLogo} />
            </StyledHeader>
            <StyledForm onSubmit={(e) => sendLogin(e)}>
                <input
                    value={userLoginLogin}
                    type="email"
                    disabled={sentRequestLogin}
                    onChange={(e) => setUserLoginLogin(e.currentTarget.value)}
                    placeholder="email"
                />
                <input
                    value={userPasswordLogin}
                    type="password"
                    disabled={sentRequestLogin}
                    onChange={(e) => setUserPasswordLogin(e.currentTarget.value)}
                    placeholder="senha"
                />
                <button
                    type="submit"
                    disabled={sentRequestLogin}
                >
                    {sentRequestLogin ? <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#FFFFFF"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    /> : "Entrar"}
                </button>
                <Link to="/cadastro">
                    Não tem uma conta? Cadastre-se!
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