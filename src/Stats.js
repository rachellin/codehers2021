import React from 'react';

import { StyledStats } from './styles/Style';
import { Timer } from './Timer';

export class Stats extends React.Component {

    render() {
        return (
            <div style={{position: "fixed", top: "4rem", left: "3rem"}}>
                <StyledStats>
                    money: {this.props.money}
                </StyledStats>
                <StyledStats>
                    products: {this.props.products}
                </StyledStats>
                <StyledStats>
                    <Timer time={this.props.time}/>
                </StyledStats>
            </div>
        )
    }
}

