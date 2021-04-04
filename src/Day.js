import React from 'react';
import 'remixicon/fonts/remixicon.css';
import {questions} from './data';

import { StyledDay } from './styles/CycleStyles';
import { Question } from './Question';

export class Day extends React.Component {
    generateQuestion (i) {
        return <Question 
            question={questions[i].question}
            answers={questions[i].answers.map(
                (ans, i) => <div className="answer" onClick={() => this.props.answerQuestion(i)}>{ans}</div>)}
            info={questions[i].info}
            isAnswered={this.props.isAnswered}
            clickNext={() => this.props.clickNext(i)}
        />
    }

    render() {
        return (
            <>
                <StyledDay 
                    style={this.props.style} 
                    onClick={this.props.onClick}
                    dayColor={this.props.dayColor}
                >
                    <i style={this.props.iconStyle} className="ri-drop-fill"></i>
                </StyledDay>
                {this.props.openQuestion ? this.generateQuestion(this.props.index) : null }
            </>
        )
    }
}