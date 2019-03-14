import React from 'react';
import PropTypes from 'prop-types';
import Loader from './loader';

const LoadingButton = ({ isLoading, onClickFn, title }) => (
  <button type="button" className="btn btn-dark rounded-pill loading-button"
    disabled={isLoading} onClick={onClickFn}>
    <span style={{visibility: isLoading ? 'hidden' : 'unset'}}>{title}</span>
    {isLoading &&
      <span className="centerer">
        <Loader/>
      </span>
    }
  </button>
);

LoadingButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClickFn: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

LoadingButton.defaultProps = {
  isLoading: false
};

export default LoadingButton;
