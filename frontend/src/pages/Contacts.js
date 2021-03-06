import React from 'react'
import Contact from '../components/contact_component'
import axios from 'axios'
import { Button, Form, Input, Modal, Segment, Message, Header, Container, Table } from 'semantic-ui-react'
import cookie from 'js-cookie'

//Get the id from the login token
var id = cookie.get('token')
if (id){
    id = JSON.parse(id).user.id
}

function Contacts() {

    //Initial state for adding a contact.
    const INITIAL_CONTACT = {
        user: id,
        name: '',
        cellphone: '',
        homephone: '',
        workphone: '',
        email: '',
        picture: '',
    }

    //React states for the Contact page
    const [contacts, setContacts] = React.useState([])
    const [contact, setContact] = React.useState(INITIAL_CONTACT)
    const [searchContact, setSearchContact] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [modalOpen, handleOpen] = React.useState(false)

    

    // "https://still-stream-56632.herokuapp.com/"  "http://localhost:3000/"
    // "http://localhost:3000/"  "http://localhost:3000/"
    const url = "http://localhost:3000/"
    
    

    //If there is no login token, return to home page
    if (!id) {
        window.location.href = "/"
    }

    //handles putting the add contact form into the Contact variable
    function handleContactChange(event) {
        const { name, value } = event.target
        setContact(prevState => ({...prevState, [name]: value }) ) 
     }


     //handles putting the search form into the searchContacts variable
     function handleSearchChange(event) {
        const { name, value } = event.target
        setSearchContact(prevState => ({...prevState, [name]: value }) ) 
     }

     //handles the search form to display the contacts that are being searched
     async function handleSearch(event) {
         event.preventDefault(event)

         try {
             const payload = {user: id, name: searchContact.search}
             const response = await axios.post(`${url}api/contacts/search/`, payload)
             setContacts(response.data)
         } catch (error) {
             console.error(error)
             setError(error)
             setContacts([]);
         }
     }

    
     //Controls the state of the create contact modal
     function closeModal() {
         handleOpen(!modalOpen)
     }

     //Handles creating the contact from the create contact form
     async function createContact(event) {
        event.preventDefault(event)

        try {
            setLoading(true)
            if (!contact.picture) { 
                contact.picture = 'https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png'
            }
            const payload = {...contact}
            await axios.post(`${url}api/contacts/add`, payload)
            setContact(INITIAL_CONTACT)
            handleOpen(false)
        } catch (error) {
            console.log(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }


    //If the page isn't being searched, get all the contacts instead
    if(!searchContact) {
    axios.get(`${url}api/contacts/?user=${id}`) 
       .then( response => {
            setContacts( response.data)
        }) 
    }
    contacts.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1: -1)
        return (
            <Container style={{paddingTop: "10px"}}>
            <Input 
                float="left"
                icon="search"
                iconPosition="left"
                placeholder="Search"
                name="search"
                value={searchContact.name}
                onChange={handleSearchChange}
            />
        
            <Button style={{marginLeft: "10px"}} content={"Search"} onClick={handleSearch} float="right" />
            
            <Modal 
                trigger={<Button color='green' onClick={closeModal} floated="right" >Add Contact</Button>} 
                open={modalOpen}  
                className="createContactForm"        
            >
                <Segment>
                    <Header content={"Create Contact"} /> 
                    <Form error={Boolean(error)} loading={loading} onSubmit={createContact}> 
                    <Message error content={error}/>
                        <Form.Input 
                            fluid
                            icon="address book"
                            iconPosition="left"
                            label="Name"
                            placeholder="Name"
                            name="name"
                            value={contact.name}
                            onChange={handleContactChange}
                        />
                        <Form.Input 
                            fluid
                            icon="phone"
                            iconPosition="left"
                            label="Cell Phone"
                            placeholder="Cell Phone"
                            name="cellphone"
                            value={contact.cellphone}
                            onChange={handleContactChange}
                        />
                        <Form.Input 
                            fluid
                            icon="phone"
                            iconPosition="left"
                            label="Work Phone"
                            placeholder="Work Phone"
                            name="workphone"
                            value={contact.workphone}
                            onChange={handleContactChange}
                        />
                        <Form.Input 
                            fluid
                            icon="phone"
                            iconPosition="left"
                            label="Home Phone"
                            placeholder="Home Phone"
                            name="homephone"
                            value={contact.homephone}
                            onChange={handleContactChange}
                        />
                        <Form.Input 
                            fluid
                            icon="envelope"
                            iconPosition="left"
                            label="Email"
                            placeholder="Email"
                            name="email"
                            value={contact.email}
                            onChange={handleContactChange}
                        />
                        
                        <Form.Input 
                            fluid
                            icon="picture"
                            iconPosition="left"
                            label="Picture (URL Address)"
                            placeholder="Picture"
                            name="picture"
                            value={contact.picture}
                            onChange={handleContactChange}
                        />
                    
                        <Button
                            disabled={loading}
                            icon="cancel"
                            type="submit"
                            color="green"
                            content="Add Contact"
                        />
                        <Button
                            disabled={loading}
                            icon="upload"
                            type="button"
                            color="red"
                            content="Cancel"
                            onClick={closeModal}
                        />
                    
                    </Form>
                </Segment>
                </Modal>
                
                
                <Table className="ui celled selectable table">
                <thead className=""  style={{'background-color':'#92a9d1'}}>
                <tr className="" style={{'background-color':'#92a9d1'}}>
                <th className="" style={{'background-color':'#92a9d1'}}>Picture</th>
                <th className="" style={{'background-color':'#92a9d1'}}>Name</th>
                <th className="" style={{'background-color':'#92a9d1'}} >Cell Phone</th>
                <th className="" style={{'background-color':'#92a9d1'}} >Home Phone</th>
                <th className="" style={{'background-color':'#92a9d1'}} >Work Phone</th>
                <th className="" style={{'background-color':'#92a9d1'}} >Email</th>
                <th className="" style={{'background-color':'#92a9d1'}} ></th>
                <th className="" style={{'background-color':'#92a9d1'}} ></th>
                </tr>
                </thead>
                <tbody className="" style={{'background-color':'#92a9d1'}}>
                {
                    contacts.map((contact) => { 
                        return <tr key={contact._id} className="" style={{'background-color':'#92a9d1'}}><Contact key={contact._id} contact={contact} ></Contact></tr>                  
                        }
                )}
                </tbody>
                </Table>
            </Container>
        )
}

export default Contacts