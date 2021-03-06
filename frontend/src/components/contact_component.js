import React from 'react'
import { Header, Image, Form, Button, Modal, Segment, Icon } from 'semantic-ui-react'
import axios from 'axios'


function Contact(props) {

    //Based state for contact
    const INITIAL_CONTACT = {
        user: props.contact.user,
        name: props.contact.name,
        cellphone: props.contact.cellphone,
        homephone: props.contact.homephone,
        workphone: props.contact.workphone,
        email: props.contact.email,
        picture: props.contact.picture,
    }

    //React states for the contact component
    const [contact, setContact] = React.useState(INITIAL_CONTACT) 
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [modalOpen, handleOpen] = React.useState(false)
    const [deleteModalOpen, handleDeleteModalOpen] = React.useState(false)
    
    // "https://still-stream-56632.herokuapp.com/"  "http://localhost:3000/"
    const url = "http://localhost:3000/"

    //Sets any change in the edit form to the contact variable
    function handleContactChange(event) {
        const { name, value } = event.target
        setContact(prevState => ({...prevState, [name]: value }) ) 
     }


    //Function called on edit form submit
    async function handleEdit(event) {
        event.preventDefault();
        
        try {
            setLoading(true)
            if (!contact.picture) { 
                contact.picture = 'https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png'
            }
                const payload = {...contact}
            await axios.post(`${url}api/contacts/edit/${props.contact._id}`, payload)
            closeModal(true)
            setContact(INITIAL_CONTACT)
        } catch(error){
            setError(true)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    
    //Function called on delete confirmation
    async function handleDelete() {
        try {
            setLoading(true)
            await axios.delete(`${url}api/contacts/${props.contact._id}`);
        } catch(error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    //Handles opening and closing the modal.  
    //When the form is canceled, the state of contact is reset
    function closeModal() {
        handleOpen(!modalOpen)
        setContact(INITIAL_CONTACT)
     }

     function closeDeleteModal() {
         handleDeleteModalOpen(!deleteModalOpen)
     }



        return (
            <>
            <td className="" style={{'background-color':'#92a9d1'}}> <Image circular src={props.contact.picture} size='small' />      </td>
            <td className="" style={{'background-color':'#92a9d1'}}> {props.contact.name}      </td>
            <td className="" style={{'background-color':'#92a9d1'}}> {props.contact.cellphone} </td>
            <td className="" style={{'background-color':'#92a9d1'}}> {props.contact.homephone} </td>
            <td className="" style={{'background-color':'#92a9d1'}}> {props.contact.workphone} </td>
            <td className="" style={{'background-color':'#92a9d1'}}> {props.contact.email}     </td>

            
            <td className="" style={{'background-color':'#92a9d1'}}>
                <Modal 
                trigger={<Button color='blue' animated='vertical' onClick={closeModal}>
                        <Button.Content hidden><Icon name='pencil' /></Button.Content>
                        <Button.Content visible>Edit Contact</Button.Content>
                    </Button>} 
                open={modalOpen}  
                         
            >
                <Segment>
                    <Header>Edit Contact</Header>
                     <Form error={Boolean(error)} loading={loading} onSubmit={handleEdit}>
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
                            loading={loading}
                            icon="upload"
                            type="submit"
                            color="green"
                            content="Save Changes"
                        />
                        <Button
                            disabled={loading}
                            loading={loading}
                            icon="cancel"
                            type="button"
                            color="red"
                            content="Cancel"
                            onClick={closeModal}
                        />
                    </Form>
                </Segment>
                </Modal>
                </td>

                <td className="" style={{'background-color':'#92a9d1'}}>
                <Modal 
                    trigger={<Button color='red' animated='vertical' onClick={closeDeleteModal} floated="left" >
                        <Button.Content hidden><Icon name='delete' /></Button.Content>
                        <Button.Content visible>Delete Contact</Button.Content>
                    </Button>}             
                    open={deleteModalOpen}
                >
                    <Header icon='archive' content='Are You Sure?' />
                    <Modal.Content>
                    <p>
                        Are you sure you want to delete this contact?
                    </p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button color='red' icon="remove" content="No" onClick={closeDeleteModal} />
                    <Button color='green' icon="checkmark" content="Yes" onClick={handleDelete} />
                    </Modal.Actions>    
                </Modal>
                </td>
            </>

        )
    }

export default Contact
