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
            hasProduct={this.props.hasProduct}
            isCollected={this.props.isCollected}
            isAnswered={this.props.isAnswered}
            isCorrect={this.props.isCorrect}
            money={this.props.money}
            clickNext={() => this.props.clickNext(i)}
            collect={() => this.props.collect(i)}
        />
    }

    render() {
        return (
            <>
                {this.props.openQuestion ? this.generateQuestion(this.props.index) : null }
                <StyledDay 
                    style={this.props.style} 
                    onClick={this.props.isAnswered ? null : this.props.onClick}
                    dayColor={this.props.dayColor}
                    isAnswered={this.props.isAnswered}
                >
                    <i style={this.props.iconStyle} className="ri-drop-fill"></i>
                </StyledDay>
            </>
        )
    }
}