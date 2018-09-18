import React from 'react';

class MenuItemForm extends React.Component {
  defaultValues = { name: '', description: '', price: 0.00, spicy_level: ''}
  state = {...this.defaultValues}
  componentDidMount() {
    if (this.props.id)
      this.setState({...this.props})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const menu_item = { ...this.state }
    this.props.submit(menu_item)
    this.setState({ ...this.defaultValues })
  }

  handleChange = (e) => {
    const { target: { name, value }} = e;
    this.setState({ [name]: value })
  }

  render() {
    const { name, description, price, spicy_level } = this.state;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={name}
          onChange={this.handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={price}
          onChange={this.handleChange}
          required
        />
        <input
          name="spicy_level"
          placeholder="Spicy Level"
          value={spicy_level || ''}
          onChange={this.handleChange}
          required
        />
        
        <button>Submit</button>
      </form>
    )
  }
}

export default MenuItemForm;