import React, { Component } from 'react';
import Input from './input';
class LoginForm extends Component {
    state = {
        account : {username : "" , password : ""},
        errors : {}
    };
    validate = () => {
        const errors={};
        const {account} = this.state
        if(account.username.trim()==="")
            errors.username="Username is required"
        if(account.password.trim()==="")
            errors.password="Password is required"
        return Object.keys(errors).length===0 ? null : errors;
    }
    /*componentDidMount(){
        this.username.current.focus(); 
    }*/ //WE USE autoFocus in input instead :  autoFocus ref={this.username}

     handleSubmit = (e) => {
        e.preventDefault(); //prevents default page reload
        //const username = document.getElementById('username').value;
        const errors=this.validate();
        console.log(errors)
        this.setState({errors});
        if (errors) return ;
        console.log("submitted"); 
    }
    handleChange = ({currentTarget : input}) => {
        const account = {...this.state.account};
        account[input.name]=input.value
        this.setState({account});
    }
    render() { 
        const {account}= this.state
     
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    < Input name="username" value={account.username} label="Username" onChange={this.handleChange}/>
                    < Input name="password" value={account.password} label="Password" onChange={this.handleChange}/>
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;