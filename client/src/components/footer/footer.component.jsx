import React from 'react';
import { Link } from 'react-router-dom';
import './footer.styles.scss';

const Footer = () => (
    <footer>
        <p>
            Créé par{' '}
            <a
                href="https://github.com/mariheck"
                target="_blank"
                rel="noopener noreferrer"
            >
                Mariheck
            </a>
        </p>{' '}
        <p>|</p>{' '}
        <p>
            <Link to="/mentions">Mentions Légales</Link>
        </p>
    </footer>
);

export default Footer;
