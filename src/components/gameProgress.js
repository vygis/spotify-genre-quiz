import React from 'react';
import PropTypes from 'prop-types';

const GameProgress = ({ current, total }) => (
  <div className="card-footer">
    {current} / {total}
  </div>
);

GameProgress.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default GameProgress;
