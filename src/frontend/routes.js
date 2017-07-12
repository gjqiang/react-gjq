/**
 * Created by gjqiang on 2017/7/12.
 */
import React from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';

import Container from './containers/Container'

const Loading = () => (
    <div>Loading...</div>
)

const createComponent = (component) =>() => (
    <Bundle load={component}>
        {
            (Component) => Component?<Component />:<Loading/>
        }
    </Bundle>
)

class RouterConfig extends React.Component{

    render(){
        return(
            // 因为是二级目录所以加一个basename属性,4.0不能在这里写嵌套路由。如果要用嵌套路由就得在路由里面写
            // 后来改用hashrouter 删除basename
            // 查资料说hashrouter删了很多api 但是如果要用BroswerHash的话有二级目录的路由就会返回404，要解决这个问题只能是后端判断路由然后强制返回200
            <Router>
                <Route path='/' component={Container}/>
            </Router>
        )
    }
}


export default RouterConfig