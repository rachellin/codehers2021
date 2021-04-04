import React from 'react';
import { questions } from './data';

import { Stats } from './Stats';
import { Cycle } from './Cycle';
import { StyledContainer } from './styles/Style';

export class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            money: 0,
            openQuestion: Array(2).fill(false),
            dayColor: Array(2).fill("lightgray"),
            isAnswered: Array(2).fill(false),
            isCorrect: Array(2).fill(false)
        }
    }

    handleClick(i) {
        let openQuestionCopy = this.state.openQuestion.slice();
        openQuestionCopy[i] = true;
        this.setState({ openQuestion: openQuestionCopy });
    }

    answerQuestion(questionIndex, answerIndex) {
        console.log(questionIndex)
        console.log(questions[questionIndex])
        let correctIndex = questions[questionIndex].correct;
        let isCorrectCopy = this.state.isCorrect.slice();
        if (answerIndex === correctIndex) {
            console.log("correct")
            isCorrectCopy[questionIndex] = true;
        } else {
            console.log("incorrect");
            isCorrectCopy[questionIndex] = false;
        }

        let isAnsweredCopy = this.state.isAnswered.slice();
        isAnsweredCopy[questionIndex] = true;
        this.setState({
            isAnswered: isAnsweredCopy,
            isCorrect: isCorrectCopy
        });
    }

    // possibly combine with handleClick? 
    handleClickNext(i) {
        let openQuestionCopy = this.state.openQuestion.slice();
        let dayColorCopy = this.state.dayColor.slice();
        openQuestionCopy[i] = false;
        if (this.state.isCorrect[i]) {
            dayColorCopy[i] = "lightgreen";
        } else {
            dayColorCopy[i] = "lightpink";
        }
        this.setState({
            openQuestion: openQuestionCopy,
            dayColor: dayColorCopy
        });
    }

    render() {
        return (
            <StyledContainer>
                <Stats money={this.state.money}/>
                <Cycle
                    openQuestion={this.state.openQuestion}
                    dayColor={this.state.dayColor}
                    isAnswered={this.state.isAnswered}
                    onClick={(i) => this.handleClick(i)}
                    answerQuestion={(i, answerIndex) => this.answerQuestion(i, answerIndex)}
                    clickNext={(i) => this.handleClickNext(i)}
                />
            </StyledContainer>
        )
    }
}