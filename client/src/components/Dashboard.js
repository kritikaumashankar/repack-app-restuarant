import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MenuForm from './MenuForm';
const styles = {
  display: 'none'
}
class Dashboard extends React.Component {
  state = { menus: [], edit: true}

  componentDidMount() {
    axios.get('/api/menus')
      .then( res => {
        this.setState({ menus: res.data }) 
      })
      
  }
  
  

 
  deleteMenu(menu){
    const { menus } = this.state
    axios.delete(`/api/menus/${menu.id}`, { menu } )
    this.setState({ menus : menus.filter(m => m.id !== menu.id)})

  }

  

  
    form() {
      return <MenuForm submit={this.submit}/>
    }

    submit = (menu) => {
    const { menus } = this.state
    const  edit  = !this.state.edit
    let newList=[]

      if(edit){
        axios.put(`/api/menus/${menu.id}`, { menu } )
        .then( res => {
          const menu_res = res.data
          newList= menus.map( item => {
            if(item.id === menu_res.id)
              return menu_res
            else
              return item 
            
          })
          this.setState({ menus: newList, edit: !this.state.edit }) })
          window.location.reload()
          
      }else{
        axios.post('/api/menus', { menu } )
        .then( res => this.setState({ menus: [res.data, ...menus ], showForm: false }) )
      }
    }
    
    toggleForm = () => {
      this.setState( state => {
        return { showForm: !state.showForm }
      })
    }
    toggleEditDiv = (i) =>{
      if(this.state.edit)
          document.getElementsByClassName("editMenu")[i].style.display = "block" 
      else
           document.getElementsByClassName("editMenu")[i].style.display = "none"
    }

    editMenu(i) {
      this.toggleEditDiv(i)
      this.setState( { edit: !this.state.edit})
    }
          
    show() {
      let { menus } = this.state;
     
        return (
          <ul>
            { menus.map( (m,i) =>
                <li key={m.id}>
                  <Link to={`/menus/${m.id}`}>{m.name}</Link>
                  <h4>{m.time}</h4>
                  <button onClick={() =>(this.deleteMenu(m))}>Delete</button>
                  <button onClick={() =>{  
                      this.editMenu(i)
                  }}>Edit</button>
                  
                  <div className="editMenu">

                    <MenuForm {...m} submit={this.submit} />
                   
                    </div>
                    
                </li>
              )
            }
          </ul>
        )
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