import React from 'react';
import PropTypes from 'prop-types';

const AnswerResult = ({ isAnswerCorrect, isLastQuestion, onClickFn }) => (
  <div className="card-overlay">
    <div className="display-4">{isAnswerCorrect ? 'CORRECT!' : 'WRONG!'}</div>
    <button type="button" className="btn btn-outline-light rounded-pill" onClick={onClickFn}>
      {isLastQuestion ? 'View results' : 'Next'}
    </button>
  </div>
);

AnswerResult.propTypes = {
  isAnswerCorrect: PropTypes.bool.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  onClickFn: PropTypes.func.isRequired
};

export default AnswerResult;
