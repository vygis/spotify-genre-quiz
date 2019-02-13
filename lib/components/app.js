import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  state = {
    data: []
  };
  async componentDidMount() {
    this.setState({
      data: await fetch('/data/5').then(resp => resp.json())
    });
  }
  render() {
    return (
      <div>
        <h1>Spotify Genre Quiz</h1>
        <textarea readOnly value={this.state.data.map(e => JSON.stringify(e))}></textarea>
      </div>
    );
  }
}

export default hot(App);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
