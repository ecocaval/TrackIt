import styled from "styled-components"

export default function UserMenu() {
    return (
        <UserMenuWrapper>
            <p>Hábitos</p>
            <TodayCircle>
                <div>
                    <p>Hoje</p>

                </div>
            </TodayCircle>
            <p>Histórico</p>
        </UserMenuWrapper>
    )
}

const UserMenuWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    position: fixed;
    width: 100vw;
    height: 70px;
    left: 0;
    bottom: 0;
    background: #FFFFFF;
    > p {
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #52B6FF;
    }
`

const TodayCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    border-radius: 90px;
    background: #52B6FF;
    margin-top: -40px;
    > div {
        > p {
            font-family: 'Lexend Deca';
            font-size: 18px;
            text-align: center;
            color: #FFFFFF;
        }
    }
`