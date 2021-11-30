import React, { Component } from 'react'



export default class Roommate extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            userSearchString : '',

        }

            this.setSearchText = this.setSearchText.bind(this);
            this.submitSearchText = this.submitSearchText.bind(this);
    }

    setSearchText(event)
    {
         this.setState({ userSearchString: event.target.value });
         console.log(this.state.userSearchString)
    }

    submitSearchText()
    {

        console.log("hit")

    }

    render() {
        return (
        
        
            <div>
    
                <form>
                    <input onChange= {this.setSearchText} type="text" placeholder="Please enter a name you wish to search"></input>

                   
                </form>
                
                

                <div className = "container">
                <button type ="submit" onClick ={this.submitSearchText}>search</button>

                </div>
    
    
             </div>
        
        
            );


    }





}
