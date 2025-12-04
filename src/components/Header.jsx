import './Header.css'
import logo from '../assets/logo.png'

export default function Header() {
    return (
        <header>
            <div className="header-left">
                <img id="logo" src={logo} alt="chef claude logo" />
                <p id="title">Chef Claude</p>
            </div>
            <a className="github-link" href="https://github.com/harshilshrma/chef-claude" target="_blank">GitHub</a>
        </header>
    )
} 