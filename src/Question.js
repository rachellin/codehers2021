import React from 'react';

import { StyledQuestion } from './styles/Style';

export class Question extends React.Component {

    render() {
        if (this.props.isAnswered) {
            return (
                <StyledQuestion>
                    <h1>{this.props.question}</h1>
                    {this.props.info}
                    <button className="close" onClick={this.props.clickNext}>next</button>
                </StyledQuestion>
            )
        }

        return (
            <StyledQuestion>
                <h1>{this.props.question}</h1>
                {this.props.answers}
            </StyledQuestion>
        )
    }
}