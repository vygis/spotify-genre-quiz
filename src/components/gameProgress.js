import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameProgress extends Component {

  constructor(props, context) {
    super(props, context);
    this.ref = React.createRef();
    this.state = {
      totalWidth: 0
    };
  }

  componentDidMount() {
    this.setState({
      totalWidth: this.ref.current.clientWidth
    });
  }

  get currentWidth () {
    return Math.ceil(this.state.totalWidth / this.props.total * this.props.upcoming);
  }

  render() {
    return (
      <div className="card-footer pt-3" ref={this.ref}>
        <div className="card-footer progress-bar" style={{width: this.currentWidth}}></div>
      </div>
    );
  }
}

GameProgress.propTypes = {
  total: PropTypes.number.isRequired,
  upcoming: PropTypes.number.isRequired
};

export default GameProgress;
