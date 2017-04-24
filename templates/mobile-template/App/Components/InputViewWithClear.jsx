import React from 'react';
import Watch from 'watchjs';

class InputViewWithClear extends React.Component {

    constructor(props) {
        super(props);

        this.value = '';
        this.placeholder = this.props.placeholder == undefined ? '' : this.props.placeholder;

        this.state = {
            value: this.value,
            placeholder: this.placeholder
        };
    }

    componentDidMount(){
        let self = this;

        Watch.watch(this, ['value', 'placeholder'], function () {
            let inputView = self.refs.inputView;
            if (self.value != inputView.value) {
                inputView.value = self.value;
            }

            self.setState({
                value: self.value,
                placeholder: this.placeholder
            });
        });
    }

    onEditing(e){
        this.value = e.target.value;
        this.setState({
            value: e.target.value
        });

        if (this.props.onInput) {
            this.props.onInput(e);
        }
    }

    clearValue(e){
        let inputView = this.refs.inputView;
        inputView.value = '';
        inputView.focus();

        this.value = '';
        this.setState({
            value: ''
        });

        if (this.props.onInput) {
            this.props.onInput(e);
        }
    }

    render(){
        return (
            <div>
                <i className={this.state.value == '' ? 'hide' : this.props.iconClass} onClick={this.clearValue.bind(this)}>
                    &#xe614;
                </i>
                <input type={this.props.type}
                       className={this.props.className}
                       placeholder={this.state.placeholder}
                       ref="inputView"
                       onInput={this.onEditing.bind(this)}
                       onBlur={this.props.onBlur}/>
            </div>
        );
    }

}

export default InputViewWithClear;