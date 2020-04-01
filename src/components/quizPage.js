import React, { useEffect, useState } from 'react';
import Game from './game';
import Intro from './intro';
import LoadingButton from './loadingButton';

const QuizPage = () => {
  const [questionCount] = useState(20);
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [gameHasBeenStarted, setGameHasBeenStarted] = useState(false);
  const [gameIsCompleted, setGameIsCompleted] = useState(false);
  const [gameIsLoading, setGameIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  const handleError = ({ message }) => {
    setErrorMessage(message);
    setIsError(true);
    setGameIsLoading(true);
  };

  const initialiseData = async () => {
    const response = await fetch(`/data/${questionCount}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    setQuestions(json);
    setGameIsCompleted(false);
    setGameIsLoading(false);
  };

  const startGame = () => setGameHasBeenStarted(true);
  const completeGame = () => setGameIsCompleted(true);
  const restartGame = async () => {
    setGameIsLoading(true);
    try {
      await initialiseData();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    async function fetchData () {
      try {
        await initialiseData();
      } catch (error) {
        handleError(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isError &&
        <div className="col-12 pt-3">
          <span className="alert alert-danger">
            {errorMessage}. Try reloading the page.
          </span>
        </div>
      }
      {!gameHasBeenStarted && !isError &&
        <div className="offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
          <Intro questionCount={questionCount}/>
          <div className="text-center pt-3">
            <LoadingButton
              isLoading={gameIsLoading}
              onClickFn={startGame}
              title="Start"
            />
          </div>
        </div>
      }
      {!!gameHasBeenStarted && !!questions.length &&
        <div className="pt-5 offset-lg-4 col-lg-4 text-center">
          <Game
            isComplete={gameIsCompleted}
            isLoading={gameIsLoading}
            onCompleteFn={completeGame}
            onRestartFn={restartGame}
            questionCount={questions.length}
            questions={questions}
          />
        </div>
      }
    </>
  );
};
export default QuizPage;
