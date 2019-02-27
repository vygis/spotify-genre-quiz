import React from 'react';
import { hot } from 'react-hot-loader/root';

import Game from './game';
import LoadingButton from './loadingButton';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      questions: [],
      gameHasBeenStarted: false,
      gameIsCompleted: false,
      gameIsLoading: true
    };

    this.completeGame = this.completeGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  async componentDidMount() {
    await this.initialiseData();
  }
  async initialiseData() {
    this.setState({
      questions: await fetch('/data/20').then(resp => resp.json()),
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
    await this.initialiseData();
  }
  startGame() {
    this.setState({
      gameHasBeenStarted: true
    });
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark">
          <a href="/" className="navbar-brand text-uppercase">
            Spotify Genre Quiz
          </a>
        </nav>
        <div className="container-fluid pt-5 pb-5">
          <div className="text-center">
            {!this.state.gameHasBeenStarted && <LoadingButton
                isLoading={this.state.gameIsLoading}
                onClickFn={this.startGame}
                title="Start"
              />}
            {!!this.state.gameHasBeenStarted && !!this.state.questions.length &&
              <Game
                isComplete={this.state.gameIsCompleted}
                isLoading={this.state.gameIsLoading}
                onCompleteFn={this.completeGame}
                onRestartFn={this.restartGame}
                questionCount={this.state.questions.length}
                questions={this.state.questions}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default hot(App);

