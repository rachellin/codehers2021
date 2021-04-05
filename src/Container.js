import React from 'react';
import { questions } from './data';
import { Timer } from './Timer';

import { Stats } from './Stats';
import { Cycle } from './Cycle';
import { StyledContainer } from './styles/Style';

export class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: "Break the Cycle",
            timeOver: false,
            gameOver: false,
            time: 1000,
            money: 0,
            products: 0,
            openQuestion: Array(questions.length).fill(false),
            dayColor: Array(questions.length).fill("lightgray"),
            isAnswered: Array(questions.length).fill(false),
            isCorrect: Array(questions.length).fill(false),
            hasProduct: Array(questions.length).fill(false), // temp
            isCollected: Array(questions.length).fill(false) // what if there is no product? just false i guess 
        }
    }

    componentDidMount() {
        this.setState({
            hasProduct: [false, false, true, false, true, false, false, true, true, false]
        })
        setInterval(() => {
            if (this.state.products >= 3) {
                this.gameOver();
                clearInterval()
            }
        }, 1000)
        setTimeout(() => {
            this.setState({ timeOver: true });
            this.gameOver();
        }, 1000*this.state.time) 
    }

    handleClick(i) {
        let openQuestionCopy = this.state.openQuestion.slice();
        let hasProductCopy = this.state.hasProduct.slice();
        openQuestionCopy[i] = true;
        this.setState({
            openQuestion: openQuestionCopy,
        });
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
            this.setState({ money: this.state.money+1 });
        } else {
            dayColorCopy[i] = "red";
        }
        this.setState({
            openQuestion: openQuestionCopy,
            dayColor: dayColorCopy
        });
    }

    // collect product 
    collect(i) {
        if (this.state.money >= 2) {
            this.setState({
                money: this.state.money - 2,
                products: this.state.products + 1
            });
        }
        let isCollectedCopy = this.state.isCollected.slice();
        isCollectedCopy[i] = true;
        this.setState({ isCollected: isCollectedCopy });
    }

    checkWin() {
        if (this.state.timeOver && this.state.products < 3) {
            this.setState({ gameOver: true });
            return false;
        } else if (this.state.products >= 3) {
            this.setState({ gameOver: true });
            return true;
        } else if (this.state.products < 3 && !this.state.timeOver) {
            this.restartCycle();
        }
    }

    gameOver() {
        if (this.checkWin()) {
            this.setState({ message: "you win!" });
        } else {
            this.setState({ message: "you lose!" });
        }
    }

    restartCycle() {
        this.setState({
            openQuestion: Array(questions.length).fill(false),
            dayColor: Array(questions.length).fill("lightgray"),
            isAnswered: Array(questions.length).fill(false),
            isCorrect: Array(questions.length).fill(false),
            hasProduct: [false, false, true, false, true, false, false, true, true, false], // should change it for this cycle
            isCollected: Array(questions.length).fill(false)  
        })
    }

    render() {
        if (this.state.gameOver) {
            return (
                <StyledContainer>
                    <Stats 
                        money={this.state.money}
                        products={this.state.products}
                        time={this.state.time}
                    />
                    <h1 className="title">{this.state.message}</h1>
                    <div className="game-over">
                        game over info
                    </div>
                </StyledContainer>
            )
        }

        return (
            <StyledContainer>
                <Stats 
                    money={this.state.money}
                    products={this.state.products}
                    time={this.state.time}
                />
                <h1 className="title">{this.state.message}</h1>
                <Cycle
                    openQuestion={this.state.openQuestion}
                    dayColor={this.state.dayColor}
                    isAnswered={this.state.isAnswered}
                    isCorrect={this.state.isCorrect}
                    hasProduct={this.state.hasProduct}
                    isCollected={this.state.isCollected}
                    money={this.state.money}
                    onClick={(i) => this.handleClick(i)}
                    answerQuestion={(i, answerIndex) => this.answerQuestion(i, answerIndex)}
                    clickNext={(i) => this.handleClickNext(i)}
                    collect={(i) => this.collect(i)}
                />
            </StyledContainer>
        )
    }
}