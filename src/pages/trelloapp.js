import React, { Component } from 'react';

class TrelloApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            card : [],
            temp_title : '',
            temp_detail : '',
            temp_detail_update : '',
            addList : true,
            displayTextArea : [],
            editTextArea : [],
            editTitle : [],
        }
    }
    addList(){
        this.setState({
            addList : !this.state.addList,
            temp_title : ''
        })
    }
    handleTitle = (event) => {
        let card_title =  {...this.state.list, title : event.target.value};
        this.setState({
            list : card_title,
            [event.target.name] : event.target.value
        })   
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleChangeUpdate = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    addCard(){ 
        let list = {
            title : this.state.temp_title,
            cardData : []
        }
        let data = {
            value : []
        }
        this.state.editTextArea.push(data);
        this.state.card.push(list);
        this.state.displayTextArea.push(false);
        this.state.editTitle.push(true);
        this.setState({
            temp_title : '',
            addList : !this.state.addList
        })
    }
    pinCardText(position){
        this.state.card[position].cardData.push(this.state.temp_detail);
        this.state.editTextArea[position].value.push(true);
        let update = this.state.displayTextArea;
        update[position] = !this.state.displayTextArea[position];
        this.setState({
            temp_detail : '',
            displayTextArea : update
        })
    }
    displayTextArea(position){
        let update = this.state.displayTextArea;
        update[position] = !this.state.displayTextArea[position];
        this.setState({
            displayTextArea : update
        })
    }
    editTextArea(position_1,position_2){
        let update = this.state.editTextArea;
        update[position_1].value[position_2] = !update[position_1].value[position_2];
        this.setState({
            editTextArea : update
        })
    }
    saveUpdate(position_1,position_2){
        let update = this.state.editTextArea;
        update[position_1].value[position_2] = !update[position_1].value[position_2];
        let updateDetail = this.state.card;
        updateDetail[position_1].cardData[position_2] = this.state.temp_detail_update;
        this.setState({
            editTextArea : update,
            card : updateDetail
         })
    }
    handleDelete(position_1,position_2){
        let update = this.state.editTextArea;
        update[position_1].value[position_2] = !update[position_1].value[position_2];
        let deleteDetail = this.state.card;
        deleteDetail[position_1].cardData.splice(position_2,1);
        this.setState({
            editTextArea : update,
            card : deleteDetail
        })
    }
    editTitle(position){
        let upateTitle = this.state.editTitle;
        upateTitle[position] = !upateTitle[position];
        this.setState({
            editTitle : upateTitle
        })
    }
    saveTitle(position){
        
    }
    handleBlur(position){
        let upateTitle = this.state.editTitle;
        upateTitle[position] = !upateTitle[position];
        let changeTitle = this.state.card;
        changeTitle[position].title = this.state.temp_title;
        this.setState({
            editTitle : upateTitle,
            card : changeTitle
        })
    }
    onDelete(position){
        let update = this.state.card;
        update.splice(position,1);
        this.setState({
            card : update

        })
    }
    render() {
        let card = this.state.card.map((value,index)=>{ 
            return(
                <div className="col-3 view" key={index}>
                    <div className="card">
                        <div>
                            {this.state.editTitle[index] ?
                            <div>
                                <span> {value.title} </span>
                                <svg onClick={()=>this.editTitle(index)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square pencil-title" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </div>
                            :
                            <div>
                                <input name="temp_title" onBlur={()=>this.handleBlur(index)} className="edit-title" onChange={this.handleChange} type="text"></input>
                                <svg width="1em" height="1em" onClick={()=>this.onDelete(index)} viewBox="0 0 16 16" className="bi bi-trash-fill delete" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>
                            </div>}
                        </div>
                        {this.state.card[index].cardData.map((data,number)=>{
                            return(
                                <div key={number}>
                                    {this.state.editTextArea[index].value[number] ?
                                    <div className="display-text">
                                        <span> {data} 
                                        <svg onClick={()=>this.editTextArea(index,number)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                        </span>
                                    </div>
                                    :
                                    <div>
                                        <textarea name='temp_detail_update' onChange={this.handleChangeUpdate}  placeholder="Enter  the  text  for  this                 card . . ."></textarea>
                                        <button className="btn-save" onClick={()=>this.saveUpdate(index,number)}>Save</button>
                                        <button className="btn-delete" onClick={()=>this.handleDelete(index,number)}>Delete</button>
                                        <img onClick={()=>this.editTextArea(index,number)} src={require('../images/icon-close.jpg')}></img>
                                    </div>}
                                </div>
                            )
                        })}         
                        {this.state.displayTextArea[index] ? 
                        <div>
                            <textarea onChange={this.handleChange} name="temp_detail" placeholder="Enter  the  text  for  this                 card . . ."></textarea>
                            <br></br>
                            <button className="btn-addcard" onClick={()=>this.pinCardText(index)}><b>Add Card</b></button>
                            <img onClick={()=>this.displayTextArea(index)} src={require('../images/icon-close.jpg')}></img>
                        </div>
                        :
                        <div className="add" onClick={()=>this.displayTextArea(index)}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            <span>Add a Card</span>
                        </div>}
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="row">
                    <div className="col-12 header">
                        <span>React Trello Clone</span>
                    </div>
                </div>
                <div className="row background">
                    <div className="col-12">
                        {card}
                        <div className="col-3 view">
                            {this.state.addList ? <div className="list" onClick={()=>this.addList()}>
                                <span>+ Add a List</span> </div> : 
                                <div className="addlist-box">
                                    <input type="text" placeholder="Enter list title" name="temp_title" value={this.state.temp_title} onChange={this.handleTitle}></input>
                                    <br></br>
                                    <button className="btn-addlist" onClick={()=>this.addCard()}><b>Add List</b></button>
                                    <img onClick={()=>this.addList()}  src={require('../images/icon-close.jpg')}></img>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrelloApp;