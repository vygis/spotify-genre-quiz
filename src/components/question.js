import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AnswerOption from './answerOption';
import AnswerResult from './answerResult';

const Question = ({ isLastQuestion, onAnswerSelect, onNext, question }) => {

  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const handleNextFn = () => {
    onNext({
      ...question,
      isAnswerCorrect
    }, isLastQuestion);
    setIsAnswered(false);
  };

  const selectAnswer = answer => {
    const matchedAnswer = question.genreOptions.find(opt => opt.value === answer);
    setIsAnswered(true);
    setIsAnswerCorrect(matchedAnswer && matchedAnswer.isCorrect);
    onAnswerSelect();
  };

  return (
    <div>
      <div className="card-img-top card-img-wrapper">
        <img src={"data:image/jpeg;base64," + question.albumCover}/>
        {isAnswered &&
          <AnswerResult
            isAnswerCorrect={isAnswerCorrect}
            isLastQuestion={isLastQuestion}
            onClickFn={handleNextFn}
          />
        }
      </div>
      <div className="card-body">
        <div className="card-text">
          {question.genreOptions.map((option, idx) =>
            <AnswerOption
              answer={option}
              discloseResult={isAnswered}
              key={idx}
              onClickFn={selectAnswer}
            />)
          }
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  isLastQuestion: PropTypes.bool.isRequired,
  onAnswerSelect: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

export default Question;
