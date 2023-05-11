import React, { useEffect } from 'react'
import NavbarCustom from './Navbar.jsx'
import Footer from './Footer.jsx'

const Layout = (props) => {

    return ( 
        <div className='ui'>
            <header>
                <NavbarCustom/>
            </header>
            <main>
                {props.children}
            </main>
            {/* <footer className='footer'>
                <Footer/>
            </footer> */}
        </div>
     )
}
 
export default Layout
