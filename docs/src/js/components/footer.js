import React from 'react';

export default class ComponentFooter extends React.Component{
    componentWillMount(){
        console.log('this is Footer componentWillMount');
    }

    componentDidMount(){
        console.log('this is Footer componentDidMount');
    }
    render(){
        return (
            <header>
                <h1>it's a footer</h1>
            </header>
        );
    }
}