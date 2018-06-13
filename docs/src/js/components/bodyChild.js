import React from 'react';
import PropTypes from 'prop-types';
//定义props的默认值
const defaultProps = {
    userId : 777
};

export default class BodyChild extends React.Component {
    render() {

        return (
            <div>
                <p>从父页面得到{this.props.userId}</p>
                {/*这里onchange不是绑定，所以不能用bind(this)，而要用props，因为是从父组件传递过来的回调函数*/}
                <input type='text' onChange={this.props.callback}/>
            </div>
        );
    }
}

BodyChild.propTypes = {
    userId: PropTypes.number.isRequired
};
//把默认值赋给类
BodyChild.defaultProps = defaultProps;
