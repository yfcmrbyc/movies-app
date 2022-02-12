import { Form, Input, Tabs } from 'antd';
import React, { Component } from 'react';

import './search-bar.css';

const { TabPane } = Tabs;

export default class SearchBar extends Component {
    state ={

    }

    render() {
        return (
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Search" key="1">
                    <Form>
                        <Form.Item>
                            <Input placeholder='Type to search...'/>
                        </Form.Item>      
                    </Form>
                </TabPane>
                <TabPane tab="Rated" key="2">
                    Content of Tab Pane 2
                </TabPane>
          </Tabs>
        )
    }

}