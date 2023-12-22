import { Outlet, Link } from 'react-router-dom'
import NavBar from './NavBar';


function BaseLayout({ handleLogout }) {
  return (
    <div className='bg-inherit'>
        <header>
            <NavBar handleLogout={handleLogout}/>
        </header>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default BaseLayout;