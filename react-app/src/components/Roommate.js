import React, { Component } from 'react'
import "./Roommate.css"
import Cookies from  'js-cookie'                                                       

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
        fetch('http://localhost:16648/api/Student/FindRoommateInfo/' + this.state.userSearchString, {
            mode: 'cors', // this cannot be 'no-cors'
            headers: {                
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
        }).then(res=>res.clone().json())
        .then(function(res) {
            console.log("hello " + res[0].username)
            // var loopData = ''
            // var i;
            // for (i = 0; i < res.length; i++)
            // {
            //     console.log("Next User: " + res[i].username)
            //     if(res[i].username != "")
            //     {
            //         currentComponent.setState({studentName: res[i].username})
                 // Add student to list
            //         currentComponent.addItem();
            //     }
               // Entries with characters entered do not match any usernames in the database
            //     else
            //         alert("No entries match the character/characters entered.")
            // }
            // currentComponent.setState({searchResults: loopData})
        })

       
    }

    render() {
        return (
        
        
            <div class= "Search container">
    
                <form>
                    <input onChange= {this.setSearchText} type="text" placeholder="Please enter a name you wish to search"/>

                   
                </form>
                <button type ="submit" onClick ={this.submitSearchText}>search</button>
                

                
            <section>
                <div className="container-results">
                    <div className="results">

                    </div>

                </div>
    
            </section>
           
             </div>
        
        
            );


    }





}
