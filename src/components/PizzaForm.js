import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" name='topping' className="form-control" placeholder="Pizza Topping"  
            value={props.currentState.topping}
            onChange={props.handleFormChange}/>
        </div>
        <div className="col">
          <select name='size' value={props.currentState.size} className="form-control" onChange={props.handleFormChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" 
            checked={props.currentState.vegetarian ? true : false}
            onChange={() => props.changeCheckbox(true)}
            />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" 
            checked={!props.currentState.vegetarian ? true: false}
            onChange={() => props.changeCheckbox(false)}
            />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.handleSubmit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
