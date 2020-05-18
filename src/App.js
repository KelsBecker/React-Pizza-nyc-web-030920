import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    editId: null,
    topping: '',
    size: '',
    vegetarian: null
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(response => response.json())
    .then(data => this.setState({
      pizzas: data
    }))
  }

  editPizza = (topping, size, vegetarian, id) => {
    this.setState({
      topping: topping,
      size: size, 
      vegetarian: vegetarian,
      editId: id
    }, console.log(this.state))
  }
  
  changeCheckbox = (value) => {
    this.setState({vegetarian: value})
  }

  handleFormChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = () => {
    const {editId, topping, size, vegetarian} = this.state
    let pizzaObj = {
      id: editId,
      topping: topping,
      size: size,
      vegetarian: vegetarian
    }
    fetch(`http://localhost:3000/pizzas/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pizzaObj)
    })
    .then(response => response.json())
    .then(newPizza => this.setState({
      pizzas: this.state.pizzas.filter(pizza => pizza.id !== newPizza.id)
    }), this.componentDidMount())
    // this.setState({
    //   editId: null,
    //   toppin: '',
    //   size: '',
    //   vegetarian: null
    // })
    //trying to clear the form
  }



  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
        currentState={this.state} 
        changeCheckbox={this.changeCheckbox} 
        handleFormChange={this.handleFormChange}
        handleSubmit={this.handleSubmit}
        />
        <PizzaList 
        pizzas={this.state.pizzas} 
        editPizza={this.editPizza}
        />
      </Fragment>
    );
  }
}

export default App;
