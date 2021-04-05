import React from 'react';

import { StyledQuestion } from './styles/Style';

export class Question extends React.Component {

    render() {
        if (this.props.isAnswered) {
            return (
                <StyledQuestion>
                    <h1>{this.props.isCorrect ? "That's right!" : "Not quite..."}</h1>
                    {this.props.info}
                    <button className="close" onClick={this.props.clickNext}>next</button>
                </StyledQuestion>
            )
        }

        return (
            <StyledQuestion>
                {!this.props.hasProduct || this.props.isCollected ?
                    <>
                        <div style={{marginBottom: "1rem"}} dangerouslySetInnerHTML={{__html: this.props.question}}/>
                        {this.props.answers}
                    </>
                :
                    <>
                        <h1>collection time!</h1>
                            It's time to change your pad/tampon/product of choice. 
                            {this.props.money >= 2 ? " Thankfully, you have enough money! Click to collect." :
                            " But you don't have enough money this time around. Click to continue the cycle."}
                        <button className="collect" onClick={this.props.collect}>
                            {this.props.money >= 2? "collect" : "next"}
                        </button>
                    </>
                }
            </StyledQuestion>
        )
    }
}