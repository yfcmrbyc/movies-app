import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

import './error-message.css';

function ErrorMessage({ message }) {
  return <Alert message="Error" description={message} type="error" showIcon />;
}

ErrorMessage.propTypes = {
  message: PropTypes.instanceOf(Error),
};

ErrorMessage.defaultProps = {
  message: 'Oops! Something went wrong.',
};

export default ErrorMessage;
