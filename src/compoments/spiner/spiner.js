import React from 'react';
import { Spin, Space } from 'antd';

import 'antd/dist/antd.css';
import './spiner.css';

function Spiner() {
  return (
    <Space size={500} className="spin-container">
      <Spin size="large" tip="Loading..." />
    </Space>
  );
}

export default Spiner;
