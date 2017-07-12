/**
 * Created by gjqiang on 2017/7/12.
 */
import React from 'react';
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import { Layout } from 'antd';

import Home from './Home'
import User from './User'
import Header from '../components/Header';

const {Content} = Layout


class Container extends React.Component{
    render(){
        // 这里首页路由如果不加exact属性就会被一直被第一个匹配到所以还是得加
        return(
            <Layout>
                <Header/>
                <Content>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/user' component={User}/>
                    </Switch>
                </Content>
            </Layout>
        )
    }
}

export default Container