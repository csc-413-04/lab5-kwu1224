import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {loadAllMessages} from './redux/actions';

class Message extends Component{
    render(){
        return (
            <div className="message">
                {this.props.content}
            </div>
        );
    }
}

class HomePage extends Component {
    constructor(props){
        super(props);
        this.sendSomeData = this.sendSomeData.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.state = {
            content: null,
            messageValue: '',
        };
    }

    componentDidMount(){
        axios.get('/api/messages')
        .then((res) => {
            console.log(res.data)
        }).catch((e) => {
            console.log(e)
        });
    }

    updateMessage(e){
        this.setState({
            messageValue: e.target.value,
        });
    }

    sendSomeData(){
        axios({
            method: 'POST',
            url: '/api/sendmessage',
            data: {
                message: this.state.messageValue
            }
        })
    .then((res) => {
        console.log(res);
    }).catch((e) => {
        console.log(e);
    });
    
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <div classname ="messages">
                {
                    this.props.messages.map((messageData, i) => {
                        return <Message key ={i} connect={messageData}/>
                    })
                }
                </div>
                <input value={this.state.messageValue} onChange={this.updatemessage}/>
                <button onClick ={this.sendSomeData}>  Send some post data   </button>
                <p>
                    Here is my main page content <Link to="/page1/mail">Mail</Link>
                </p>
                <p>
                    <a href="https://reacttraining.com/react-router/web/guides/quick-start">Click me to find out more about routing</a>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        messages : state.testReducer.messages,
    };
};


const mapDispatchToProps = {loadAllMessages};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);