import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './question';
import GameResult from './gameResult';
import GameProgress from './gameProgress';

class Game extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentQuestionIndex: 0,
      upcomingQuestionIndex: 0,
      answers: []
    }

    this.handleAnswerSelectFn = this.handleAnswerSelectFn.bind(this);
    this.handleNextFn = this.handleNextFn.bind(this);
  }
  handleNextFn(answer, isLastAnswer) {
    this.setState(oldState => {
      return {
        currentQuestionIndex: isLastAnswer ? 0 : oldState.currentQuestionIndex + 1,
        answers: oldState.currentQuestionIndex === 0 ? [answer] : oldState.answers.concat(answer),
        upcomingQuestionIndex: isLastAnswer ? 0 : oldState.upcomingQuestionIndex
      }
    });
    if (isLastAnswer) {
      this.props.onCompleteFn();
    }
  }
  handleAnswerSelectFn() {
    this.setState(oldState => ({
      upcomingQuestionIndex: oldState.upcomingQuestionIndex+1
    }))
  }
  render() {
    return (
      <section>
        {!this.props.isComplete &&
          <div className="card mx-auto">
            <Question
              isLastQuestion={this.state.currentQuestionIndex === this.props.questionCount-1}
              onAnswerSelect={this.handleAnswerSelectFn}
              onNext={this.handleNextFn}
              question={this.props.questions[this.state.currentQuestionIndex]}
            />
            <GameProgress
              upcoming={this.state.upcomingQuestionIndex}
              total={this.props.questionCount}
            />
          </div>
        }
        {this.props.isComplete &&
          <GameResult
            answers={this.state.answers}
            isLoading={this.props.isLoading}
            onClickFn={this.props.onRestartFn}
          />
        }
      </section>
    );
  }
}

Game.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onCompleteFn: PropTypes.func.isRequired,
  onRestartFn: PropTypes.func.isRequired,
  questionCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
}

export default Game;
