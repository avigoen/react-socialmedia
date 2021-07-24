import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function MenuBar() {
    const location = useLocation()
    const [activeItem, setActiveItem] = useState(location.pathname)

    const handleItemClick = (e, { name }) => setActiveItem(`/${name === "home" ? "" : name}`)

    return (
        <div>
            <Menu pointing secondary size="massive" color="teal">
                <Menu.Item
                    name='home'
                    active={['/', '/home'].includes(activeItem)}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={activeItem === '/login'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        name='register'
                        active={activeItem === '/register'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/register"
                    />
                    {/* <Menu.Item
                        name='logout'
                        active={activeItem === '/logout'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/logout"
                    /> */}
                </Menu.Menu>
            </Menu>
        </div>
    )
}