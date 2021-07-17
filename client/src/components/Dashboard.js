import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Dashboard(props){

    
    return (
        <div>
      
            <p>Welcome {props.user.username}, this is the Dashboard.</p>

           

          

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Dashboard)