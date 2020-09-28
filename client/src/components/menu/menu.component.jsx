import React from 'react';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../utils/constants';
import './menu.styles.scss';

class Menu extends React.Component {
    state = {
        photosCollections: []
    };

    componentDidMount() {
        fetch(`${SERVER_URL}/collections/photos`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (!response.ok) throw new Error();
                else return response.json();
            })
            .then(collections => {
                this.setState({
                    ...this.state,
                    photosCollections: collections.filter(
                        collection => collection.tag !== 'overview'
                    )
                });
            })
            .catch(error => {});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.photosCollections !== nextState.photosCollections ||
            this.props.isMenuHidden !== nextProps.isMenuHidden
        ) {
            return true;
        }
        return false;
    }

    render() {
        const { isMenuHidden, onToggleMenu } = this.props;
        const { photosCollections } = this.state;

        return (
            <nav className={isMenuHidden ? 'hidden' : 'displayed'}>
                <ul className="menu">
                    <li>
                        <Link to="/" onClick={onToggleMenu}>
                            Overview
                        </Link>

                        <ul className="sub-menu">
                            {photosCollections.map((collection, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={`/photos/${collection.tag}`}
                                        onClick={onToggleMenu}
                                    >
                                        {collection.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <Link to="/videos" onClick={onToggleMenu}>
                            Video
                        </Link>
                    </li>
                    <li>
                        <Link to="/bio" onClick={onToggleMenu}>
                            Bio
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={onToggleMenu}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Menu;
