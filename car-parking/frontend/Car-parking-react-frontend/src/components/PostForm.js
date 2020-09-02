import React, {Component} from 'react'


class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserID: '',
            carNumber: '',
            date: new Date().toLocaleString()
        }
    }


    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        const {userID, carNumber} = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="UserID" value={userID} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input type="text" minLength="4" maxLength="8" name="carNumber" value={carNumber} onChange={this.changeHandler}/>
                    </div>
                    <div className="date">
                        <p> {this.state.date}</p>
                    </div>
                    <button type={"submit"}>Submit</button>
                </form>
            </div>

        )
    }
}


export default PostForm;