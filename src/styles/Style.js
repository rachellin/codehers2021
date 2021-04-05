import styled from 'styled-components';

// export const StyledCycle = styled.div`

// `;

export const StyledContainer = styled.div`
    .title {
        position: fixed;
        top: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
    }
`;


export const StyledStats = styled.div`
    border-radius: 2rem;
    padding: 1rem;
    background: lightpink;
    display: block;
    width: 150px;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.2rem;
`;

export const StyledQuestion = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 50vw;
    border-radius: 2rem;
    padding: 2rem;
    background: lightpink;
    z-index:9999;

    .answer {
        padding: 2rem;
        border-radius: 2rem;
        background: #fafafa;
        margin-bottom: 0.5rem;

        :hover {
            cursor: pointer;
        }
    }

    .close, .collect {
        display: block;
        margin: auto;
    }

`;


