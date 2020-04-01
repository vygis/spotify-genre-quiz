import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const GameProgress = ({ total, upcoming }) => {

  const [totalWidth, setTotalWidth] = useState(0);
  const ref = createRef();

  const getCurrentWidth = () => Math.ceil(totalWidth / total * upcoming);
  useEffect(() => setTotalWidth(ref.current.clientWidth), []);

  return (
    <div className="card-footer pt-3" ref={ref}>
      <div className="card-footer progress-bar" style={{width: getCurrentWidth()}}></div>
    </div>
  );
};

GameProgress.propTypes = {
  total: PropTypes.number.isRequired,
  upcoming: PropTypes.number.isRequired
};

export default GameProgress;
