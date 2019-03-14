import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerOption from './answerOption';
import AnswerResult from './answerResult';

class Question extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isAnswered: false,
      isAnswerCorrect: false
    };

    this.handleNextFn = this.handleNextFn.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  handleNextFn() {
    this.props.onNext({
      ...this.props.question,
      isAnswerCorrect: this.state.isAnswerCorrect
    }, this.props.isLastQuestion);
    this.setState({
      isAnswered: false
    });
  }
  selectAnswer(answer) {
    const matchedAnswer = this.props.question.genreOptions.find(opt => opt.value === answer);
    this.setState({
      isAnswered: true,
      isAnswerCorrect: matchedAnswer && matchedAnswer.isCorrect
    });
    this.props.onAnswerSelect();
  }
  render() {
    return (
      <div>
        <div className="card-img-top card-img-wrapper">
          <img src={"data:image/jpeg;base64," + this.props.question.albumCover}/>
          {this.state.isAnswered &&
            <AnswerResult
              isAnswerCorrect={this.state.isAnswerCorrect}
              isLastQuestion={this.props.isLastQuestion}
              onClickFn={this.handleNextFn}
            />
          }
        </div>
        <div className="card-body">
          <div className="card-text">
            {this.props.question.genreOptions.map((option, idx) =>
              <AnswerOption
                answer={option}
                discloseResult={this.state.isAnswered}
                key={idx}
                onClickFn={this.selectAnswer}
              />)
            }
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  isLastQuestion: PropTypes.bool.isRequired,
  onAnswerSelect: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

export default Question;
