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
                    <Timer time={this.props.time} stop={this.props.stop}/>
                </StyledStats>
                <StyledStats style={{cursor: "pointer"}} onClick={() => this.props.showInstructions()}>
                    instructions
                </StyledStats>
                    
            </div>
        )
    }
}

// how to show instructions w/o starting over

