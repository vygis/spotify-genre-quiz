import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerOption extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClickFn = this.handleClickFn.bind(this);
  }
  get class() {
    return this.props.discloseResult
      ? this.props.answer.isCorrect ? 'correct' : 'incorrect'
      : '';
  }
  handleClickFn() {
    this.props.onClickFn(this.props.answer.value);
  }
  render() {
    return (
      <span
        className={'badge badge-pill badge-dark text-uppercase ' + this.class}
        onClick={this.handleClickFn}
      >
        {this.props.answer.value}
      </span>
    );
  }
}

AnswerOption.propTypes = {
  answer: PropTypes.object.isRequired,
  discloseResult: PropTypes.bool.isRequired,
  onClickFn: PropTypes.func.isRequired
};

export default AnswerOption;
