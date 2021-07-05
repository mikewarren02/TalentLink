import './App.css'
import Header from './Header'
import Footer from './Footer'
import {Component} from 'react'


 class BaseLayout extends Component{
    render(){
        return(
            <div>
                <Header />
                {this.props.children}
                <Footer />
              
            </div>
            
            )
    }

}
export default BaseLayout