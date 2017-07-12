/**
 * Created by gjqiang on 2017/7/11.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import RouterConfig from 'frontend/routes'
import 'frontend/style/common.scss'

const mountNode = document.getElementById('root')


ReactDOM.render(
    <RouterConfig/>
    , mountNode
)


