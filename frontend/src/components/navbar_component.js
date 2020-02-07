import React from 'react'
import {Header, Button, Menu, Container, Segment, Visibility} from 'semantic-ui-react'
import cookie from 'js-cookie'

var id = cookie.get('token')

function handleLogout() {
    cookie.remove("token");
    window.location.href = '.Login'
}


function Navbar() {

    const [fixed] = React.useState(false)

    function showContact() {
        if (!id) {
            return
        } else {
            return (
                <Menu.Item as='a' href='/Contacts'>Contacts</Menu.Item>
            )
        }
    }

    function showLoginOrLogout() {
        if (!id) { 
          return (
            <>
            <Button as='a' inverted={!fixed} href='/login'>
                Log in
            </Button>
            <Button as='a' inverted={!fixed} primary={fixed}  href='/signup'>
                Sign Up
            </Button>
            </>
          )
        } else {
          return (
            <>
            <Button as='a' inverted={!fixed} primary={fixed}  href='/' onClick={handleLogout}>
                Log out
            </Button>
            </>
          )
        }
      }
 
    return (
        <Visibility
          once={false}
        >
          <Segment inverted>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active href='/'>
                  Home
                </Menu.Item>
                {showContact()}
                <Menu.Item position='right'>
                    {showLoginOrLogout()}
                </Menu.Item> 
              </Container>
            </Menu>
          </Segment>
        </Visibility>
    )
}

export default Navbar