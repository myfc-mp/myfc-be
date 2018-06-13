let React = require('react');
let ReactDOM = require('react-dom');
import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';
import ComponentBody from './components/bodyIndex';

class Index extends React.Component{
    componentWillMount(){
        console.log('this is Index componentWillMount');
    }

    componentDidMount(){
        console.log('this is Index componentDidMount');
    }
    render(){
        return(
            <div>
                <ComponentHeader/>
                <ComponentBody />
                <ComponentFooter/>
            </div>

        );
    }
}

ReactDOM.render(<Index/>,document.getElementById('example'));
