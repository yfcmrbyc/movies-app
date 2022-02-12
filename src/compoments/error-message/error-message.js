import React from 'react';
import { Alert } from 'antd';

import './error-message.css';

function ErrorMessage() {
    return (
        <Alert
            message="Error"
            description="Unfortunately, something went wrong.
            Please check the network quality and reload the page."
            type="error"
            showIcon
      />
    );
}

export default ErrorMessage;
