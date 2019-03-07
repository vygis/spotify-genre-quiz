import React from 'react';
import Game from './game';
import Intro from './intro';
import LoadingButton from './loadingButton';

class QuizPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      questionCount: 20,
      questions: [],
      errorMessage: '',
      gameHasBeenStarted: false,
      gameIsCompleted: false,
      gameIsLoading: true,
      isError: false
    };
    this.completeGame = this.completeGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  handleError({ message }) {
    this.setState({
      errorMessage: message,
      isError: true,
      gameIsLoading: false
    })
  }
  async componentDidMount() {
    try {
      await this.initialiseData();
    } catch (error) {
      this.handleError(error);
    }
  }
  async initialiseData() {
    const response = await fetch(`/data/${this.state.questionCount}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    this.setState({
      questions: json,
      gameIsCompleted: false,
      gameIsLoading: false
    });
  }
  completeGame() {
    this.setState({
      gameIsCompleted: true
    });
  }
  async restartGame() {
    this.setState({
      gameIsLoading: true
    });
    try {
      await this.initialiseData();
    } catch (err) {
      this.handleError(err);
    }
  }
  startGame() {
    this.setState({
      gameHasBeenStarted: true
    });
  }
  render() {
    return (
      <>
        {this.state.isError &&
          <div className="col-12 pt-3">
            <span className="alert alert-danger">
              {this.state.errorMessage}. Try reloading the page.
            </span>
          </div>
        }
        {!this.state.gameHasBeenStarted && !this.state.isError &&
          <div className="offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
            <Intro questionCount={this.state.questionCount}/>
            <div className="text-center pt-3">
              <LoadingButton
                isLoading={this.state.gameIsLoading}
                onClickFn={this.startGame}
                title="Start"
              />
            </div>
          </div>
        }
        {!!this.state.gameHasBeenStarted && !!this.state.questions.length &&
          <div className="pt-5 offset-lg-4 col-lg-4 text-center">
            <Game
              isComplete={this.state.gameIsCompleted}
              isLoading={this.state.gameIsLoading}
              onCompleteFn={this.completeGame}
              onRestartFn={this.restartGame}
              questionCount={this.state.questions.length}
              questions={this.state.questions}
            />
          </div>
        }
      </>
    );
  }
}

export default QuizPage;
