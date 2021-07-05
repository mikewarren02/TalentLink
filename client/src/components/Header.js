import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Header(){

    return (
        <div className ='navbar'>
            <div className='logo' >

            </div>
            <div className = 'nav-items'>

            </div>
            
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuthenticated
    }
}


export default connect(mapStateToProps)(Header)