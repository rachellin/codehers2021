import React from 'react';

import { StyledStats } from './styles/Style';

export class Stats extends React.Component {
    render() {
        return (
            <StyledStats>
                money: {this.props.money}
            </StyledStats>
        )
    }
}

Stats.defaultProps = {
    money: 1
}