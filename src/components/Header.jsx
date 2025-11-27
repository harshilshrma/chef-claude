import './Header.css'
import logo from '../assets/logo.png'

export default function Header() {
    return (
        <div id="header">
            <img id="logo" src={logo} alt="chef claude logo"/>
            <p id="title">Chef Claude</p>
        </div>
    )
} 