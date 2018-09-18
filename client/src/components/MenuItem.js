import React from 'react';
import axios from 'axios';
import MenuItemForm from './MenuItemForm';
import '../App.css'

class MenuItem extends React.Component {
  state = { menu: {},menu_items: [],editMenuItem:false}

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/menus/${id}`)
      .then( res => {
        this.setState({ menu: res.data })
        
       }
    )
    axios.get(`/api/menus/${id}/menu_items`)
      .then( res => {
        this.setState({ menu_items: res.data })
        
       }
    )
  }
  deleteMenuItem(menu_item){
    const { id } = this.props.match.params
    const { menu_items } = this.state
    axios.delete(`/api/menus/${id}/menu_items/${menu_item.id}`, { menu_item } )
    this.setState({ menu_items : menu_items.filter(m => m.id !== menu_item.id)})

  }
  form() {
    return <MenuItemForm submit={this.submit}/>
  }
  submit = (menu_item) => {
    const { id } = this.props.match.params
    const { editMenuItem } = this.state
    let { menu_items } = this.state
    let newList=[]
    if(!editMenuItem){
      axios.post(`/api/menus/${id}/menu_items`, { menu_item } )
      .then( res => this.setState({ menu_items: [{...res.data}, ...menu_items ], showForm: false }) )

    }else{
      axios.put(`/api/menus/${id}/menu_items/${menu_item.id}`, { menu_item } )
      .then( res => {
        const menu_item_res = res.data
         newList= menu_items.map( item => {
          if(item.id === menu_item_res.id)
            return menu_item_res
          else
            return item 
          
        })
        this.setState({ menu_items: newList, editMenuItem: false }) })
    }
  }

  toggleForm = () => {
    
    this.setState( state => {
      return { showForm: !state.showForm }
    })
  }
  
  toggleEditDiv = (i) =>{
    debugger
    if(document.getElementsByClassName("editMenuItem")[i].style.display === "none")
         document.getElementsByClassName("editMenuItem")[i].style.display = "block"
    else
         document.getElementsByClassName("editMenuItem")[i].style.display = "none"
  }
    
  

  editMenuItem(id) {
    this.toggleEditDiv(id)
        this.setState( { editMenuItem: !this.state.editMenuItem})
  }
  showMenuItems(){
    
    let { menu_items } = this.state;
      return (
        <ul>
          { 
            menu_items.map( (mi,i) =>
            
              <li key={mi.id}>
                <h3>{mi.name}</h3>
                <h4>{mi.description}</h4>
                <h4>{mi.price}</h4>
                <h4>{mi.spicy_level}</h4>
                <button onClick={() =>{}}>Edit</button>
                <div className='editMenuItem'>
                  <MenuItemForm {...mi} submit={this.submit} />
                  </div>
                <button onClick={() =>(this.deleteMenuItem(mi))}>Delete</button>
              </li>
            )
            
          }
        </ul>
      )
  }

  

  render() {
    const { name,showForm } = this.state;
    return (
      <div>
        <h1>{name}</h1>
        <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Show' } form</button>
        { showForm ? this.form() : this.showMenuItems() }     
      </div>
    )
  }
  
}

export default MenuItem;