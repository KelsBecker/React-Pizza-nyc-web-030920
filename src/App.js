import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    topping: '',
    size: '',
    vegetarian: true,
    pizzaId: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(response => response.json())
    .then(data => this.setState({pizzas: data}))
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCarnivors = () => {
    this.setState({
      vegetarian: !this.state.vegetarian
    })
  }

  editPizza = (id, topping, size, veg) => {
    this.setState({
      topping: topping,
      size: size,
      vegetarian: veg,
      pizzaId: id
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('EDIT THAT PIZZA')
    fetch(`http://localhost:3000/pizzas/${this.state.pizzaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: this.state.vegetarian
      })
    })
    .then(response => response.json())
    .then(updatedZa => this.setState({
      pizzas: this.state.pizzas.map( pizza => pizza.id !== updatedZa.id ? pizza : updatedZa),
      topping: '',
      size: '',
      vegetarian: '',
      pizzaId: null
    }))
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
        currentState={this.state} 
        handleFormChange={this.handleFormChange}
        handleCarnivors={this.handleCarnivors}
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
