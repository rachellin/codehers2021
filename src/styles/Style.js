import styled from 'styled-components';

// export const StyledCycle = styled.div`

// `;

export const StyledContainer = styled.div`
    display: flex;
`;


export const StyledStats = styled.div`
    border-radius: 2rem;
    padding: 1rem;
    background: lightpink;
`;

export const StyledQuestion = styled.div`
    position: fixed;
    width: 50vw;
    height: 50vh;
    border-radius: 2rem;
    padding: 2rem;
    background: lightpink;

    .answer {
        padding: 2rem;
        border-radius: 2rem;
        background: #fafafa;
        margin-bottom: 0.5rem;

        :hover {
            cursor: pointer;
        }
    }

    .close {
        display: block;
        margin: auto;
    }

`;

