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
            showInstructions: true,
            startGame: false,
            stop: false,
            time: 60*7,
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
        console.log("length: "+questions.length)
        this.insertProducts();
        setInterval(() => {
            if (this.state.products >= 3) {
                this.setState({ stop: true });
                this.gameOver();
                clearInterval();
            } // else if all are used but time not over and not enough products 
            else if (this.state.isAnswered.every( (val, i, arr) => val === arr[0] && arr[0] == true)) {
                this.restartCycle();
            }
        }, 1000)
    }

    insertProducts() {
        let random;
        let spots = [];
        let hasProductCopy = this.state.hasProduct.slice();
        for (let i = 0; i < 6; i++) {
            while (spots.includes(random)) {
                random = Math.floor(Math.random()*14);
            }
            spots.push(random);
        }
        for (let i = 0; i < spots.length; i++) {
            hasProductCopy[spots[i]] = true;
        }
        this.setState({ hasProduct: hasProductCopy });
        console.log(hasProductCopy);
    }

    startGame() {
        this.setState({ showInstructions: false });
        if (!this.state.startGame) this.setState({ startGame: true });
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
            dayColorCopy[i] = "red";
            this.setState({ money: this.state.money+1 });
        } else {
            dayColorCopy[i] = "lightgreen";
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
            message: "You don't have enough products... you must restart the cycle.",
            openQuestion: Array(questions.length).fill(false),
            dayColor: Array(questions.length).fill("lightgray"),
            isAnswered: Array(questions.length).fill(false),
            isCorrect: Array(questions.length).fill(false),
            isCollected: Array(questions.length).fill(false)  
        });
        this.insertProducts();
    }

    render() {
        if (this.state.showInstructions) {
            return (
                <StyledContainer>
                    {this.state.startGame ? 
                        <Stats 
                            money={this.state.money}
                            products={this.state.products}
                            time={this.state.time}
                            stop={this.state.stop}
                        />
                    : 
                        null
                    }
                    <h1 className="title">Break the Cycle</h1>
                    <div className="instructions">
                        Welcome to Break the Cycle! <br/><br/>
                        There are 14 (blood) drops on the circle - each respresenting 2 days in an average menstrual cycle (28 days).<br/>
                        Click on each drop to answer questions about menstruation and period poverty. 
                        The answer will be revealed after you choose your response. 
                        The timer will not stop while you read the correct answer, but make sure you absorb the information!
                        It's important to learn for the sake of understanding period poverty - and to win the game, of course. <br/><br/>

                        The drop will be red if you get the question correct, green if you get it incorrect. 
                        Pretty unconventional, yes, but blood is red, and menstrual is <i>not wrong</i>.<br/><br/>

                        At random drops, you will have the chance to collect/buy your menstrual products. Each product costs 2 coins.
                        If you don't have enough money at that point, you won't be able to collect.<br/>
                        If you don't collect at least 4 products after one cycle (all the questions) and the time isn't over, you must begin again.
                        The collection points will change, but the questions won't.<br/>
                        If the time ends before you collect at least 4 products, you lose.<br/>
                        In short, the objective is to <b>break the cycle</b> - literally, so you learn how to contribute to breaking the period poverty cycle, so girls everywhere can have their cycles without sacrificing their education and/or health.
                        <button style={{display: "block", margin: "2rem auto"}} onClick={() => this.startGame()}>play</button>
                    </div>
                </StyledContainer>
            )
        }

        if (this.state.gameOver) {
            return (
                <StyledContainer>
                    <Stats 
                        money={this.state.money}
                        products={this.state.products}
                        time={this.state.time}
                        stop={this.state.stop}
                        showInstructions={() => this.setState({ showInstructions: true })}
                    />
                    <h1 className="title">{this.state.message}</h1>
                    <div className="game-over">
                        <p>Period poverty is the inadequate access to menstrual hygiene tools and education. This issue affects people all over the globe, including the US. Period poverty has been shown to directly affect a girl’s potential to succeed. If a girl misses school every time she has her period, she is set <b>145 days</b> behind her male counterparts. The longer it took for you to collect the products in this game, the more school you would've missed. Most girls in the developing world choose to drop out of school altogether rather than face the embarrassment and shame of being unprepared for their cycles.</p>
                        <b>Here's how you can help:</b>
                        <ul>
                            <li>buy your products from brands that give back (Always, Pink Parcel)</li>
                            <li>donate: <a target="_blank" href="http://thehomelessperiod.com/">The Homeless Period</a>, <a target="_blank" href="http://redboxproject.org/">The Red Box Project</a>, <a target="_blank" href="https://freedom4girls.wordpress.com/">Freedom4Girls</a></li>
                            <li>sign petitions</li>
                            <li>go on marches</li>
                            <li>raise awareness</li>
                            <li>educate yourself: hopefully, you've learned more from this game!</li>
                        </ul>
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
                    stop={this.state.stop}
                    showInstructions={() => this.setState({ showInstructions: true })}
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