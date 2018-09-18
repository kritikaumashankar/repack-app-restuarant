import React from 'react';

class MenuForm extends React.Component {
  defaultValues = { name: '', time: ''}
  state = {...this.defaultValues}

  componentDidMount() {
    if (this.props.id)
      this.setState({...this.props})
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const menu = { ...this.state }
    this.props.submit(menu)
    this.setState({ ...this.defaultValues })
  }

  handleChange = (e) => {
    const { target: { name, value }} = e;
    this.setState({ [name]: value })
  }

  render() {
    const { name, time } = this.state;
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
          name="time"
          placeholder="Time"
          value={time}
          onChange={this.handleChange}
          required
        />
        
        <button>Submit</button>
      </form>
    )
  }
}

export default MenuForm;