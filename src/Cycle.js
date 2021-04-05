import React from 'react';
import 'remixicon/fonts/remixicon.css';
import { questions } from './data';

import { Day } from './Day';
import { StyledCycle, Circle } from './styles/CycleStyles';

export class Cycle extends React.Component {

    generateDays (circleSize) {
        let arr = [];
        let item;
        let deg = 360/questions.length;
        for (let i = 0; i < questions.length; i++) {
            item = <Day 
                        index={i}
                        style={{transform: `rotate(${deg*i}deg) translate(${circleSize/2}px)`}}
                        iconStyle={{transform: `rotate(${-i*deg}deg)`}}  // not working
                        dayColor={this.props.dayColor[i]}
                        openQuestion={this.props.openQuestion[i]}
                        onClick={() => this.props.onClick(i)}
                        answerQuestion={(answerIndex) => this.props.answerQuestion(i, answerIndex)}
                        hasProduct={this.props.hasProduct[i]}
                        isCollected={this.props.isCollected[i]}
                        isAnswered={this.props.isAnswered[i]}
                        isCorrect={this.props.isCorrect[i]}
                        money={this.props.money}
                        clickNext={() => this.props.clickNext(i)}
                        collect={() => this.props.collect(i)}
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
                    {/* center icon here */} <i className="ri-moon-clear-line"></i>
                    {this.generateDays(circleSize)}
                </Circle>
            </StyledCycle>
        )
    }
}