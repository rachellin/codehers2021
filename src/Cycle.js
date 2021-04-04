import React from 'react';
import 'remixicon/fonts/remixicon.css';
import { Day } from './Day';

import { StyledCycle, Circle } from './styles/CycleStyles';

export class Cycle extends React.Component {

    generateDays (circleSize) {
        let arr = [];
        let item;
        let deg = 360/2;
        for (let i = 0; i < 2; i++) {
            item = <Day 
                        index={i}
                        style={{transform: `rotate(${deg*i}deg) translate(${circleSize/2}px)`}}
                        iconStyle={{transform: `rotate(${-i*deg}deg)`}}  // not working
                        dayColor={this.props.dayColor[i]}
                        openQuestion={this.props.openQuestion[i]}
                        onClick={() => this.props.onClick(i)}
                        answerQuestion={(answerIndex) => this.props.answerQuestion(i, answerIndex)}
                        isAnswered={this.props.isAnswered[i]}
                        clickNext={() => this.props.clickNext(i)}
                    />;
            arr.push(item);
        }
        return arr;
    }


    render() {
        let circleSize = 500;
        return (
            <StyledCycle>
                <Circle circleSize={circleSize}>
                    {/* center icon here */} 
                    {this.generateDays(circleSize)}
                </Circle>
            </StyledCycle>
        )
    }
}