import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MenuForm from './MenuForm';

class Dashboard extends React.Component {
  state = { menus: []}

  componentDidMount() {
    axios.get('/api/menus')
      .then( res => {
        this.setState({ menus: res.data }) 
      })
      
  }

  show() {
    let { menus } = this.state;
   
      return (
        <ul>
          { menus.map( m =>
              <li key={m.id}>
                <Link to={`/menus/${m.id}`}>{m.name}</Link>
                <h4>{m.time}</h4>
              </li>
            )
          }
        </ul>
      )
    }
    form() {
      return <MenuForm submit={this.submit}/>
    }
    submit = (menu) => {
      const { menus } = this.state
      axios.post('/api/menus', { menu } )
        .then( res => this.setState({ menus: [res.data, ...menus ], showForm: false }) )
    }
  
    toggleForm = () => {
      this.setState( state => {
        return { showForm: !state.showForm }
      })
    }
  
    render() {
      const { showForm } = this.state;
      return (
        <div>
          <h2>Menus</h2>
          <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Show' } form</button>
          { showForm ? this.form() : this.show() }     
        </div>
      )
    }



}

export default Dashboard;