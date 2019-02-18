import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './question';
import GameResult from './gameResult';

class Game extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentQuestionIndex: 0,
      answers: []
    }

    this.handleNextFn = this.handleNextFn.bind(this);
  }
  handleNextFn(answer, isLastAnswer) {
    this.setState(oldState => {
      return {
        currentQuestionIndex: isLastAnswer ? 0 : oldState.currentQuestionIndex + 1,
        answers: oldState.currentQuestionIndex === 0 ? [answer] : oldState.answers.concat(answer)
      }
    });
    if (isLastAnswer) {
      this.props.onCompleteFn();
    }
  }
  render() {
    return (
      <div>
        {!this.props.isComplete &&
          <Question
            isLastQuestion={this.state.currentQuestionIndex === this.props.questionCount-1}
            onNext={this.handleNextFn}
            question={this.props.questions[this.state.currentQuestionIndex]}
          />
        }
        {this.props.isComplete &&
          <GameResult
            answers={this.state.answers}
            isLoading={this.props.isLoading}
            onClickFn={this.props.onRestartFn}
          />
        }
      </div>
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
