import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Logo from '../../assets/logo_cut.jpg';
import './header.styles.scss';

const Header = ({ onToggleMenu }) => (
    <header>
        <Icon name="bars" size="big" onClick={onToggleMenu} />
        <Link to="/">
            <img src={Logo} alt="Logo Saving Anthony P." />
        </Link>
        <div className="credits">
            <ul>
                <li>
                    <a
                        href="https://www.instagram.com/saving_anthonyp/"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                    >
                        <Icon name="instagram" size="large" />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.facebook.com/ssaving01/"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                    >
                        <Icon name="facebook f" size="large" />
                    </a>
                </li>
            </ul>
            <p>
                © <span>Saving</span> {new Date().getFullYear()}
            </p>
        </div>
    </header>
);

export default Header;
