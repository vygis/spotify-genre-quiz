import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

const GameResult = ({ answers, isLoading, onClickFn }) => (
  <div>
    <h2>Quiz completed!</h2>
    <p>
      You answered {answers.reduce((acc, { isAnswerCorrect }) => acc + (isAnswerCorrect ? 1 : 0), 0)}
      &nbsp;out of&nbsp;
      {answers.length} questions correctly.
    </p>
    <div>
      <Button
        isDisabled={isLoading}
        onClickFn={onClickFn}
        title="Play again"
      />
    </div>
  </div>
);

GameResult.propTypes = {
  answers: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClickFn: PropTypes.func.isRequired
}
export default GameResult;
