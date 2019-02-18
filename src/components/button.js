import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ isDisabled, onClickFn, title }) => (
  <button type="button" className="btn btn-dark rounded-pill"
    disabled={isDisabled} onClick={onClickFn}>
    {title}
  </button>
);

Button.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onClickFn: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

Button.defaultProps = {
  isDisabled: false
}

export default Button;
