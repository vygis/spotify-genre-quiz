import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Question from './question';
import GameResult from './gameResult';
import GameProgress from './gameProgress';


const Game = ({ isComplete, isLoading, onCompleteFn, onRestartFn, questionCount, questions }) =>  {
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ upcomingQuestionIndex, setUpcomingQuestionIndex ] = useState(0);
  const [ answers, setAnswers ] = useState([]);

  const handleNextFn = (answer, isLastAnswer) => {
    setCurrentQuestionIndex(isLastAnswer ? 0 : currentQuestionIndex + 1);
    setAnswers(currentQuestionIndex === 0 ? [answer] : answers.concat(answer));
    setUpcomingQuestionIndex(isLastAnswer ? 0 : upcomingQuestionIndex);
    if (isLastAnswer) {
      onCompleteFn();
    }
  };

  const handleAnswerSelectFn = () => setUpcomingQuestionIndex(upcomingQuestionIndex+1);
  return (
    <section>
      {!isComplete &&
        <div className="card mx-auto">
          <Question
            isLastQuestion={currentQuestionIndex === questionCount-1}
            onAnswerSelect={handleAnswerSelectFn}
            onNext={handleNextFn}
            question={questions[currentQuestionIndex]}
          />
          <GameProgress
            upcoming={upcomingQuestionIndex}
            total={questionCount}
          />
        </div>
      }
      {isComplete &&
        <GameResult
          answers={answers}
          isLoading={isLoading}
          onClickFn={onRestartFn}
        />
      }
    </section>
  );
};

Game.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onCompleteFn: PropTypes.func.isRequired,
  onRestartFn: PropTypes.func.isRequired,
  questionCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default Game;
