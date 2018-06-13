import React from 'react';

export default class ComponentHeader extends React.Component{
    componentWillMount(){
        console.log('this is Header componentWillMount');
    }

    componentDidMount(){
        console.log('this is Header componentDidMount');
    }
    render(){
        return (
            <header>
                <h1>it's a header</h1>
            </header>
        );
    }
}