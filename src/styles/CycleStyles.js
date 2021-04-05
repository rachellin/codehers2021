import styled from 'styled-components';

// export const StyledCycle = styled.div`

// `;

export const StyledCycle = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 500px;
    border: 1px solid #eee;
`;

export const Circle = styled.div`
    //margin-top:100px;
    //margin-bottom:100px;
    position:relative;
    width: ${props => props.circleSize}px;
    height: ${props => props.circleSize}px;
    border-radius: 50%;
    border:1px solid black;

    > i {
        font-size:125px;
        line-height:2em;
    }

    i {
        color: lightpink;
    }
    
`;

export const StyledDay = styled.div`
    position: absolute;
    //background: black;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    margin-left:-1.5em;
    margin-top:-1.5em;
    width: 3rem;
    height: 3rem;

    i {
        width: 3rem;
        height: 3rem;
        font-size: 3rem;
        //padding: 0.5rem;
        color: ${props => props.dayColor};
    }

    :hover {
        cursor: pointer;
    }
`;


