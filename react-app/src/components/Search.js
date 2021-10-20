import React, { Component } from 'react';
import 'antd/dist/antd.css';

import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
} from 'antd';

export default class Search extends Component {

    render() {

        return (
            <div>
                <h1>Search</h1>
            
            <div>
            
            <Form>
            
            <Form.Item
                id = "searchBar"
                name="searchBar"
                label="Search"
            >

            <Input />

            </Form.Item>
            
            </Form>
            </div>
        </div>
        );
    }













};