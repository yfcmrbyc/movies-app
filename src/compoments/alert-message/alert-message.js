import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

function AlertMessage({ query }) {
  const message = `No results were found for «${query}»`;

  return (
    <Alert
      message={message}
      description="Verify that the request was specified without errors.
            Try reducing the number of words in your query.
            Try changing the query."
      type="info"
      showIcon
    />
  );
}

AlertMessage.propTypes = {
  query: PropTypes.string,
};

AlertMessage.defaultProps = {
  query: '',
};

export default AlertMessage;
