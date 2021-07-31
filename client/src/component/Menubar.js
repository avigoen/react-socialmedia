import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'

export default function MenuBar() {
    const { user, logout } = useContext(AuthContext)
    const location = useLocation()
    const [activeItem, setActiveItem] = useState(location.pathname)

    const setActive = (pathname) => {
        setActiveItem(`/${["home", "/"].includes(pathname) ? "" : pathname}`)
    }

    const handleItemClick = (e, { name }) => setActive(name)

    useEffect(() => {
        setActive(location.pathname.substring(1))
    }, [location.pathname])

    return (
        <div>
            <Menu pointing secondary size="massive" color="teal">
                <Menu.Item
                    name={user ? user.username : 'home'}
                    active={user ? true : ['/', '/home'].includes(activeItem)}
                    onClick={user ? null : handleItemClick}
                    as={Link}
                    to="/"
                />
                <Menu.Menu position='right'>
                    {user ? <Menu.Item
                        name='logout'
                        onClick={logout}
                    /> : <>
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
                    </>
                    }

                </Menu.Menu>
            </Menu>
        </div>
    )
}