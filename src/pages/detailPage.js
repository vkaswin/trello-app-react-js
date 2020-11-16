import React, { Component } from 'react';

class DetailPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : {}
        }
    }
    componentDidMount(){
        this.setState({
            data : this.props.history.location.state
        })
    }
    render() {
        return (
            <div className="container-fluid">
                {!this.state.data ? 
                <div><b>No Details Found</b></div> :
                <div>
                    <b> {this.state.data.name} </b>
                    <br></br>
                    <span> {this.state.data.description} </span>
                </div>
                }
            </div>
        );
    }
}

export default DetailPage;