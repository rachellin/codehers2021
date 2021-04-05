import React from 'react';

export class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: {}, seconds: this.props.time, stop: this.props.stop };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
        setInterval(() => {
            this.setState({ stop: this.props.stop });
        }, 500); // idk if decreasing this acc helps bc countdown is still 1 sec interval
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    stop() {
        this.setState({ stop: true });
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        if (this.state.seconds == 0 || this.state.stop) { 
            clearInterval(this.timer);
        }
    }

    isOver() {
        if (this.state.seconds == 0) { 
            clearInterval(this.timer);
            console.log("time over")
            return true;
        }
        return false;
    }

    render() {
        return(
            <div>
                time: {this.state.time.m}m {this.state.time.s}s
            </div>
        );
    }
}