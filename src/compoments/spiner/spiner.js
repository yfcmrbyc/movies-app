import React from 'react';
import { Spin, Space } from 'antd';

import 'antd/dist/antd.css';
import './spiner.css';

function Spiner() {
  return (
    <Space size="middle" className="spin-container">
      <Spin size="large" />
    </Space>
  );
}

export default Spiner;
