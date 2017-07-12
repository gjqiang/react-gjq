/**
 * Created by gjqiang on 2017/7/7.
 */
import React from 'react'
export default class Bundle extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.load(this.props)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }
    load = (props) => {
        this.setState({
            mod:null
        })
        props.load((mod) => {
            this.setState({
                mod:mod.default?mod.default:mod
            })
        })
    }
    render() {
        return this.props.children(this.state.mod)
    }
}