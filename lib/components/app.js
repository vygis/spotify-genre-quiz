import React from 'react';
import ReactDOM from 'react-dom';

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
        <h1>Spotify genre quiz</h1>
        <textarea readOnly value={this.state.data && this.state.data.map(e => JSON.stringify(e))}></textarea>
      </div>
    );
  }
}

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
