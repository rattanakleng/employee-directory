import React, { Component } from "react";
import Search from './Search';
import API from "../utils/API";


class Body extends Component {

    state = {
        result:[],
        search: ""
      };
        // When this component mounts, search for the employee "50"
    componentDidMount() {   

        API.getEmployees()
            .then(res => {
                this.setState({ result: res.data.results })
               
                console.log(res.data.results)
            })            
    };   

    handleInputChange = event => {
        const value = event.target.value;
        this.setState({ search: value });    
    };
    
    render() {   
        
    return (        
        <div className="container">

            <Search
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
            />
            
            
            <div className="row">    
                {this.state.result.filter((val) => {
                    if (this.state.search === "") { return val } else if  

               (val.name.first.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return val
                    }
            }).map(employee =>
                <div className="col-4">
                    <div className="card" style={{ width: "18rem" }}>

                        <img src={employee.picture.large} className="card-img-top" alt="Profile img" />

                        <div className="card-body">
                    
                            <h5 className="card-title"> {employee.name.first} {employee.name.last} </h5>
        
                            <p className="card-text">Email: {employee.email}</p>
                        </div>
                    </div>
                </div>
                
            )}

            </div>            
        </div>        
    )

    }          
        
};

export default Body;