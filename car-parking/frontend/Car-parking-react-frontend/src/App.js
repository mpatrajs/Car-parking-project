import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from 'react-calendar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            carNum: '',
            name: '',
            surname: '',
            phone: '',
            aproval: "unknown",
            historyCarNumber: [],
            historyCarStatus: [],
            historyActive: [],
            date: new Date()
        };
    }


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };
    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('/api/car_park', this.state)
            .then(response => {
                this.setState({
                    posts: response.data,
                    time: response.data.carAddedTime
                })
                axios.get('/api/car_park/car/'+this.state.userId+'/all')
                    .then(response => {
                        //carNum + approvedStatus check
                    if(this.state.userId === parseInt(this.state.userId, 10)){
                        if (response.data.length===1){
                            this.setState({
                                historyCarNumber: [response.data[response.data.length-1].carNum],
                                historyCarStatus: [response.data[response.data.length-1].approvedStatus],
                                historyActive: [response.data[response.data.length-1].active]
                            })               
                        }else if(response.data.length===2){
                            this.setState({
                                historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum],
                                historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus],
                                historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active]
                            })
                        }else{
                            this.setState({
                                historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum,response.data[response.data.length-3].carNum],
                                historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus,response.data[response.data.length-3].approvedStatus],
                                historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active,response.data[response.data.length-3].active]
                            }) 
                        }   
                    } else {toast.error(response.data.message)}
                        console.log(response.data.message)
                    })
                    .catch(function (error) {
                            console.log(error);
                    })
            })
            .catch(error => {
                switch (error.response.status) {
                    case 409:
                        toast.error("Some problem with car  " + this.state.carNum + " information!")
                        break
                    case 203:
                        toast.error("Incorrect employee ID format!")
                        break
                    case 423:
                        toast.error("Incorrect phone number format!")
                        break
                    case 406:
                        toast.error("The limit of cars exceeded! Please delete at least 1 car!")
                        break
                    case 403:
                        toast.error("Car number " + this.state.carNum + " already exist in database!")
                        break
                    case 417:
                        toast.error("Incorrect car number format!")
                        break
                    case 401:
                        toast.error("Some problem with user  " + this.state.userId + " information!")
                        break
                    case 500:
                        toast.error("Server Error!")
                        console.log("Server error, try again later")
                        break
                    default:
                        toast.error("Some Error occurred!")
                        break
                }
                console.log(error.response.status)
                console.log('Error retreiving data')

            })

    }
    activeCarhandler = () => {
        setTimeout(() => {
            axios.get('/api/car_park/car/'+this.state.userId+'/all')
                .then(response => {
                //carNum + approvedStatus check
                if (response.data.length===1){
                    this.setState({
                        historyCarNumber: [response.data[response.data.length-1].carNum],
                        historyCarStatus: [response.data[response.data.length-1].approvedStatus],
                        historyActive: [response.data[response.data.length-1].active]
                    })               
                }else if(response.data.length===2){
                    this.setState({
                        historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum],
                        historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus],
                        historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active]
                    })
                }else if(response.data.length===3){
                    this.setState({
                        historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum,response.data[response.data.length-3].carNum],
                        historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus,response.data[response.data.length-3].approvedStatus],
                        historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active,response.data[response.data.length-3].active]
                    }) 
                }else if(response.data.length===0){
                    this.setState({
                        historyCarNumber: [],
                        historyCarStatus: [],
                        historyActive: []
                    })       
                }       
                })
                .catch(function (error) {
                    console.log(error);
                })
        }, 1000)
    }

    getingResponse = e => {
        e.preventDefault()
        axios.get('/api/car_park/car/'+this.state.userId+'/all')
        .then(response => {
            if (response.data.length===1){
                this.setState({
                    historyCarNumber: [response.data[response.data.length-1].carNum],
                    historyCarStatus: [response.data[response.data.length-1].approvedStatus],
                    historyActive: [response.data[response.data.length-1].active]
                })               
            }else if(response.data.length===2){
                this.setState({
                    historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum],
                    historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus],
                    historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active]
                })
            }else{
                this.setState({
                    historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum,response.data[response.data.length-3].carNum],
                    historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus,response.data[response.data.length-3].approvedStatus],
                    historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active,response.data[response.data.length-3].active]
                }) 
            }    
        console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    onChange = date => this.setState({ date })

    settingActiveResponse1 = e => {
        this.setState({
            dateAdd: new Date().toLocaleString()
        })
        e.preventDefault()
        axios.put('/api/car_park/car/'+this.state.historyCarNumber[0]+'/set_active')
                .then(response => {
                  console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
    settingActiveResponse2 = e => {
        this.setState({
            dateAdd: new Date().toLocaleString()
        })
        e.preventDefault()
        axios.put('/api/car_park/car/'+this.state.historyCarNumber[1]+'/set_active')
                .then(response => {
                  console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
    settingActiveResponse3 = e => {
        this.setState({
            dateAdd: new Date().toLocaleString()
        })
        e.preventDefault()
        axios.put('/api/car_park/car/'+this.state.historyCarNumber[2]+'/set_active')
                .then(response => {
                  console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
    deletingResponse1 = e => {
        e.preventDefault()
        axios.delete('/api/car_park/car/'+this.state.historyCarNumber[0])
                .then(response => {
                  console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
    deletingResponse2 = e => {
        e.preventDefault()
        axios.delete('/api/car_park/car/'+this.state.historyCarNumber[1])
                .then(response => {
                  console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
    deletingResponse3 = e => {
        e.preventDefault()
        axios.delete('/api/car_park/car/'+this.state.historyCarNumber[2])
                .then(response => {
                  console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
    render() {
        const { userId, carNum, name, surname, phone } = this.state
        return (

            <div className="App container">

                <div className="container">
                    <div className="py-5 text-center">
                        <img className="d-block mx-auto mb-2"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Feature_parking.svg/600px-Feature_parking.svg.png"
                            alt="" width="72" height="72" />
                        <h2>Parking system&#8203;</h2>
                        <p className="lead">Register your car or change number fast and easy</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4 order-md-2 mb-2">
                            <div>
                                <Calendar onChange={this.onChange} value={this.state.date}/>
                            </div>
                            <div className="mb-3">
                            </div>
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your parking history</span>
                            </h4>
                            <form className="needs-validation" noValidate="" onClick={this.activeCarhandler}>
                                <ul className="list-group mb-3">
                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                        <h6 className="my-0">Car #3
                                            {this.state.historyCarStatus[2]
                                                ? <button className="btn btn-danger btn-sm btn-sm" type={"active"} onClick={this.deletingResponse2}>Delete</button>
                                                : this.state.historyCarStatus[2]===false
                                                    ? <button className="btn btn-danger btn-sm btn-sm" type={"active"} onClick={this.deletingResponse2}>Delete</button>
                                                    : ''
                                            }  
                                            {this.state.historyCarStatus[2]
                                                ? <button className="btn btn-outline-primary btn-sm btn-sm" type={"active"} onClick={this.settingActiveResponse2}>Set active</button>
                                                : ''
                                            }  
                                            </h6>          
                                            <small className="text-muted">Status: {this.state.historyCarStatus[2]  ? 'Approved' : this.state.historyCarStatus[2]===false  ? 'Waiting for approval' : ''}</small>
                                        </div>
                                        <span className="text-muted">{this.state.historyCarNumber[2]}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                        <h6 className="my-0">Car #2 
                                            {this.state.historyCarStatus[1]
                                                ? <button className="btn btn-danger btn-sm btn-sm" type={"active"} onClick={this.deletingResponse2}>Delete</button>
                                                : this.state.historyCarStatus[1]===false
                                                    ? <button className="btn btn-danger btn-sm btn-sm" type={"active"} onClick={this.deletingResponse2}>Delete</button>
                                                    : ''
                                            }  
                                            {this.state.historyCarStatus[1]
                                                ? <button className="btn btn-outline-primary btn-sm btn-sm" type={"active"} onClick={this.settingActiveResponse2}>Set active</button>
                                                : ''
                                            }  
                                            </h6>  
                                            <small className="text-muted">Status: {this.state.historyCarStatus[1]  ? 'Approved' : this.state.historyCarStatus[1]===false  ? 'Waiting for approval' : ''}</small>
                                        </div>
                                        <span className="text-muted">{this.state.historyCarNumber[1]}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">Car #1 
                                            {this.state.historyCarStatus[0]
                                                ? <button className="btn btn-danger btn-sm btn-sm" type={"active"} onClick={this.deletingResponse1}>Delete</button>
                                                : this.state.historyCarStatus[0]===false
                                                    ? <button className="btn btn-danger btn-sm btn-sm" type={"active"} onClick={this.deletingResponse1}>Delete</button>
                                                    : ''
                                            }  
                                            {this.state.historyCarStatus[0]
                                                ? <button className="btn btn-outline-primary btn-sm btn-sm" type={"active"} onClick={this.settingActiveResponse1}>Set active</button>
                                                : ''
                                            }  
                                            </h6>
                                            <small className="text-muted">Status: {this.state.historyCarStatus[0]  ? 'Approved' : this.state.historyCarStatus[0]===false  ? 'Waiting for approval' : ''}</small>
                                        </div>
                                        <span className="text-muted">{this.state.historyCarNumber[0]}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between bg-light">
                                        <div className="text-success"><h6 className="my-0">Active car:   </h6>
                                        <small>Time: 
                                            {this.state.historyActive[0]  ? this.state.dateAdd : ''}
                                            {this.state.historyActive[1]  ? this.state.dateAdd : ''}
                                            {this.state.historyActive[2]  ? this.state.dateAdd : ''}
                                        </small>
                                        </div>
                                        <span className="text-success">
                                            {this.state.historyActive[0]  ? this.state.historyCarNumber[0] : ''}
                                            {this.state.historyActive[1]  ? this.state.historyCarNumber[1] : ''}
                                            {this.state.historyActive[2]  ? this.state.historyCarNumber[2] : ''}
                                        </span>

                                    </li>
                                </ul>
                            </form>
                            
                            
                        </div>
                        <div className="col-md-4 order-md-1">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Add car</span>
                            </h4>

                            <form className="needs-validation" noValidate="" onSubmit={this.submitHandler}>

                                <div className="mb-3">
                                    <label>Employee ID<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text"  className="form-control" placeholder="your ID number"
                                        name="userId" value={userId} onChange={this.changeHandler} required />
                                </div>

                                <div className="mb-3">
                                    <label> Car number<span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="form-control" placeholder="your car number"
                                        minLength="2" maxLength="8" name="carNum" value={carNum}
                                        onChange={this.changeHandler} required />
                                </div>
                                <div className="mb-3">
                                    <label>First name</label>
                                    <input type="text" className="form-control" placeholder="your first name"
                                        name="name" value={name} onChange={this.changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label>Last name</label>
                                    <input type="text" className="form-control" placeholder="your last name"
                                        name="surname" value={surname} onChange={this.changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label>Phone number</label>
                                    <input type="text" className="form-control" placeholder="your phone number"
                                        name="phone" value={phone} onChange={this.changeHandler} />
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="save-info" required />
                                    <label className="custom-control-label" htmlFor="save-info">Agree with
                                        <a href="https://www.terms.com/"> terms and conditions</a> </label>
                                    <ToastContainer />
                                </div>
                                <hr className="mb-2" />
                                <button className="btn btn-primary btn-lg btn-lg" type={"submit"} onClick={this.activeCarhandler}>Submit</button>
                                <div className="mb-1">
                                </div>
                                    <button className="btn btn-primary btn-lg btn-lg" type={"submit"} onClick={this.getingResponse}>Check car status</button>
                                <div className="mb-3">
                                </div>
                                <div className="mb-4 red">
                                    <label style={{ color: 'red' }}>* required field </label>
                                </div>
                                


                            </form>
                        </div>
                    </div>
                    <footer className="my-5 pt-5 text-muted text-center text-small">
                        <p className="mb-1">© 2020 AppZilla</p>
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="https://privacy.com">Privacy</a></li>
                            <li className="list-inline-item"><a href="https://privacy.com">Terms</a></li>
                            <li className="list-inline-item"><a href="https://privacy.com">Support</a></li>
                        </ul>
                    </footer>
                </div>
            </div>
        );

    }
}


export default App;
