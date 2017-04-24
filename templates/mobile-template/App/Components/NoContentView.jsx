import React from 'react';
import Images from '../Helper/Images';

class NoContentView extends React.Component {

    constructor(props) {
        super(props);
    }

    btnCallback() {
        this.props.btnCallback();
    }

    render() {

        let btn = this.props.type == 1 ? (
            <button className="btn btnmessage mt10" onClick={this.btnCallback.bind(this)}>
                {this.props.btnTitle}
            </button>
        ) : '';

        return (
            <section className="messagetextarea">
                <img src={Images.i_no_content} width="65%"/>
                <div className="gray font14 mt10">{this.props.message}</div>
                {btn}
            </section>
        );
    }
}

NoContentView.propTypes = {
    type: React.PropTypes.number.isRequired, //0:静态无按钮 1:动态有按钮
    message: React.PropTypes.string.isRequired,
    btnTitle: React.PropTypes.string,
    btnCallback: React.PropTypes.func
};

NoContentView.defaultProps = {
    type: 0,
    message: '',
    btnTitle: '',
    btnCallback: () => {
    }
};

export default NoContentView;