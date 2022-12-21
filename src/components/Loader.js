// libraries
import styled from "styled-components"
import { ProgressBar } from "react-loader-spinner"

export default function Loader() {

    return (
        <LoaderWrapper>
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#000000'
                barColor='#126BA5'
            />
        </LoaderWrapper>
    )
}

const LoaderWrapper = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: calc(100vh - 140px);  
`