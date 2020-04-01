import React from 'react';
import PropTypes from 'prop-types';

const AnswerOption = ({ answer, discloseResult, onClickFn }) => {

  const getClass = () =>  discloseResult ? (answer.isCorrect ? 'correct' : 'incorrect') : '';
  const handleClickFn = () =>  onClickFn(answer.value);

  return (
    <span
      className={'badge badge-pill badge-dark text-uppercase ' + getClass()}
      onClick={handleClickFn}
    >
      {answer.value}
    </span>
  );
};

AnswerOption.propTypes = {
  answer: PropTypes.object.isRequired,
  discloseResult: PropTypes.bool.isRequired,
  onClickFn: PropTypes.func.isRequired
};

export default AnswerOption;
