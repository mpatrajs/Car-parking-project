import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            historyCarNumber: [],
            historyCarStatus: [],
            historyActive: [],
            historyCarTime: [],
            approveCarNum: "",
            deleteID: "",
            deleteCarNum: ""


        };
        this.submitHandler = this.submitHandler.bind(this)
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    submitHandler = e => {
        e.preventDefault();
        axios.get('/api/car_park/person/' + this.state.userId)
            .then(response => {
                console.log(response.data)
                this.setState({
                    firstName: response.data.name,
                    lastName: response.data.surname,
                    phone: response.data.phone
                })

                axios.get('/api/car_park/car/' + this.state.userId + '/all')
                    .then(response => {
                        console.log(response.data)
                        if (response.data.length===1){
                            this.setState({
                                historyCarNumber: [response.data[response.data.length-1].carNum],
                                historyCarStatus: [response.data[response.data.length-1].approvedStatus],
                                historyActive: [response.data[response.data.length-1].active],
                                historyCarTime:[response.data[response.data.length-1].carAddedTime]
                            })               
                        }else if(response.data.length===2){
                            this.setState({
                                historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum],
                                historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus],
                                historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active],
                                historyCarTime:[response.data[response.data.length-1].carAddedTime,response.data[response.data.length-2].carAddedTime]
                            })
                        }else if(response.data.length===3){
                            this.setState({
                                historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum,response.data[response.data.length-3].carNum],
                                historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus,response.data[response.data.length-3].approvedStatus],
                                historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active,response.data[response.data.length-3].active],
                                historyCarTime:[response.data[response.data.length-1].carAddedTime,response.data[response.data.length-2].carAddedTime,response.data[response.data.length-3].carAddedTime]
                            }) 
                        }else if(response.data.length===0){
                            this.setState({
                                historyCarNumber: [],
                                historyCarStatus: [],
                                historyActive: [],
                                historyCarTime:[]
                            })       
                        }       
                        })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                switch (error.response.status) {
                    case 401:
                        toast.error("No information in database")
                        break
                    default:
                        toast.error("Some Error occurred!")
                        break
                }
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
                        historyActive: [response.data[response.data.length-1].active],
                        historyCarTime:[response.data[response.data.length-1].carAddedTime]
                    })               
                }else if(response.data.length===2){
                    this.setState({
                        historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum],
                        historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus],
                        historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active],
                        historyCarTime:[response.data[response.data.length-1].carAddedTime,response.data[response.data.length-2].carAddedTime]
                    })
                }else if(response.data.length===3){
                    this.setState({
                        historyCarNumber: [response.data[response.data.length-1].carNum,response.data[response.data.length-2].carNum,response.data[response.data.length-3].carNum],
                        historyCarStatus: [response.data[response.data.length-1].approvedStatus,response.data[response.data.length-2].approvedStatus,response.data[response.data.length-3].approvedStatus],
                        historyActive: [response.data[response.data.length-1].active,response.data[response.data.length-2].active,response.data[response.data.length-3].active],
                        historyCarTime:[response.data[response.data.length-1].carAddedTime,response.data[response.data.length-2].carAddedTime,response.data[response.data.length-3].carAddedTime]
                    }) 
                }else if(response.data.length===0){
                    this.setState({
                        historyCarNumber: [],
                        historyCarStatus: [],
                        historyActive: [],
                        historyCarTime:[]
                    })       
                }       
                })
        }, 1000)
    }

    deleteUserHandler = e => {
        e.preventDefault()
        axios.delete('/api/car_park/person/' + this.state.deleteID)
            .then(response => {
                console.log(response.data)
                toast.info("User " + this.state.userId + " deleted")

            })

            .catch(function (error) {
                toast.error("Some Error occurred!")
                console.log(error);
            })
    }
    deleteCarHandler = e => {
        e.preventDefault()
        axios.delete('/api/car_park/car/' + this.state.deleteCarNum)
            .then(response => {
                console.log(response.data)
                toast.info("Car " + this.state.deleteCarNum + " deleted")

            })

            .catch(function (error) {
                toast.error("Some Error occurred!")
                console.log(error);
            })
    }
    aprovalHandler = e => {
        //e.preventDefault()
        axios.get('/api/car_park/car/' + this.state.userId + '/all')
            .then(response => {
                console.log(response.data)
                axios.put('/api/car_park/car/approve', { "carNum": this.state.approveCarNum, "approvedStatus": true
             }
                )
                    .then(response => {
                        console.log(response.data)

                    })
                    .catch(function (error) {
                        console.log(error);
                        toast.error("Some Error occurred put!")
                    })
            })
            .catch(function (error) {
                console.log(error);
                toast.error("Some Error occurred get!")
            })
        this.submitHandler()
    }

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
        const { userId, deleteID, deleteCarNum, approveCarNum } = this.state
        return (

            <div className="App container">
                <ToastContainer />
                <div className="container">
                    <div className="py-5 text-center">
                        <img className="d-block mx-auto mb-2"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Feature_parking.svg/600px-Feature_parking.svg.png"
                            alt="" width="72" height="72" />
                        <h2>Parking system&#8203;</h2>
                        <p className="lead">Admin page</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4 order-md-2 mb-2">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Information about employee </span>
                            </h4>
                            <form className="needs-validation" noValidate="" onClick={this.activeCarhandler}>
                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Name: </h6>
                                    </div>
                                    <span className="text-muted">{this.state.firstName}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Surname: </h6>
                                    </div>
                                    <span className="text-muted">{this.state.lastName}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Phone Nr.: </h6>
                                    </div>
                                    <span className="text-muted">{this.state.phone}</span>
                                </li>
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
                                            <small className="text-muted">Status: {this.state.historyCarStatus[2]  ? 'Approved' : this.state.historyCarStatus[2]===false  ? 'Waiting for approval' : ''}  <br /> Time: {this.state.historyCarTime[2]}</small>
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
                                            <small className="text-muted">Status: {this.state.historyCarStatus[1]  ? 'Approved' : this.state.historyCarStatus[1]===false  ? 'Waiting for approval' : ''}  <br /> Time: {this.state.historyCarTime[1]}</small>
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
                                            <small className="text-muted">Status: {this.state.historyCarStatus[0]  ? 'Approved' : this.state.historyCarStatus[0]===false  ? 'Waiting for approval' : ''} <br /> Time: {this.state.historyCarTime[0]} </small>
                                        </div>
                                        <span className="text-muted">{this.state.historyCarNumber[0]}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between bg-light">
                                        <div className="text-success"><h6 className="my-0">Active car:   </h6>
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
                                <span className="text-muted">Check employee</span>
                            </h4>

                            <form className="form-inside-input"  onSubmit={this.submitHandler} noValidate>
                                            
                                <div className="mb-3">
                                    <label>Employee ID </label>
                                    <input type="text" className="form-control" placeholder="employee ID number"
                                        name="userId" value={userId} onChange={this.changeHandler} />
                                </div>
                                <hr className="mb-2" style={{
                                    height: .5,
                                    borderColor: 'blue'
                                }} />
                                <button className="btn btn-primary btn-sml" type={"submit"} onClick={this.submitHandler}>Get information</button>

                                <div className="mb-3">
                                    <br />
                                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-muted">Aprove car status</span>
                                    </h4>
                                    <input type="text" className="form-control" placeholder="Car number"
                                        name="approveCarNum" value={approveCarNum} onChange={this.changeHandler}/>

                                </div>

                                <hr className="mb-2" style={{
                                    height: .5,
                                    borderColor: 'lightgreen'
                                }} />
                                <button className="btn btn-success btn-sml btn-sml" type={"submit"} onClick={this.aprovalHandler}>Aprove car</button>


                                <div className="mb-3">

                                    <br />
                                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-muted" >Delete car </span>
                                    </h4>
                                    <input type="text" className="form-control" placeholder="Car number"
                                        name="deleteCarNum" value={deleteCarNum} onChange={this.changeHandler}/>

                                </div>

                                <hr className="mb-2" style={{
                                    height: .5,
                                    borderColor: 'red'
                                }} />


                                <button className="btn btn-danger btn-sml" type={"submit"} onClick={this.deleteCarHandler}>Delete car</button>
                                <div className="mb-3">

                                    <br />
                                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-muted" >Delete Employee </span>
                                    </h4>
                                    <input type="text" className="form-control" placeholder="employee ID number"
                                        name="deleteID" value={deleteID} onChange={this.changeHandler} />

                                </div>

                                <hr className="mb-2" style={{
                                    height: .5,
                                    borderColor: 'red'
                                }} />

                                <button className="btn btn-danger btn-sml" type={"submit"} onClick={this.deleteUserHandler}>Delete user</button>
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
};


export default App;