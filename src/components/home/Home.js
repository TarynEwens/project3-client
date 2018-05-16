import React, { Component } from 'react'
// $ is a shortcut for jQuery methods
import $ from 'jquery'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {itemsReceived: ""}
    this.getItems = this.getItems.bind(this)
  }
  getItems() {
      let token = "Bearer " + localStorage.getItem("jwt")
      console.log(token)
      $.ajax({
        url: "https://cheesepets-api.herokuapp.com/items.json",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', token)},
        context: this, // Allows us to use this.setState inside success
        success: function (result) {
          console.log(result)
          this.setState({itemsReceived: JSON.stringify(result)})
        }
      })
    }


  login () {
    const email = $("#email").val()
    const password = $("#password").val()
    const request = {"auth": {"email": email, "password": password}}
    $.ajax({
      url: "https://cheesepets-api.herokuapp.com/user_token",
      type: "POST",
      data: request,
      dataType: "json",
      success: function (result) {
        console.log(result)
        localStorage.setItem("jwt", result.jwt)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1 style={{marginTop: "20vh", marginBottom: "5vh"}}>
          CheesePets Home
        </h1>
        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            name="email"
            id="email"
            type="email"
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            id="password"
            type="password"
          />
          </form>
          <br />
          <button
            onClick={this.login}
          >
              Login
          </button>
        <br />
        <button
          onClick={this.getItems}
          style={{marginTop: "10vh"}}
          >
          Get Items
        </button>
        <p>{this.state.itemsReceived}</p>
      </div>
    );
  }
}
export default App
