import React from 'react';
import BodyChild from './bodyChild';
export default class ComponentBody extends React.Component{
    constructor(){
        super();
        this.state = {
            username:'Parry',
            htmlContent:'long Xiao bo'
        };
    }
    componentWillMount(){
        console.log('this is Body componentWillMount');
    }

    componentDidMount(){
        console.log('this is Body componentDidMount');
    }

    changeUserName(){
        this.setState({htmlContent:'fan yan'});
    }
    //回调函数，提供给被调用组件调用，被调用组件可以凭此函数，修改本模块的内容
    changeUser(event){
        //回调传入的内容是一个事件
        this.setState({htmlContent:event.target.value});
    }

    render(){

        return (
            <header>
                <h1>it's the body</h1>
                <p>{this.state.username === '' ? 'not login' : 'name:'+ this.state.username}</p>
                <input type='button' value={'submit'} onClick={this.changeUserName.bind(this)}/>
                {/*这是一个注释*/}
                <p>{this.state.htmlContent}</p>
                {/*下面的语句，可以把本模块的回调函数传递给子模块*/}
                <BodyChild {...this.props} callback={this.changeUser.bind(this)}/>
            </header>
        );
    }
}