/**
 * Created by gjqiang on 2017/7/12.
 */
import React from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'

class Header extends React.Component{
    render(){
        return(
            <ul>
                <li>
                    <Link to="/user">
                        toUser
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        toIndex
                    </Link>
                </li>
            </ul>
        )
    }
}

export default Header
