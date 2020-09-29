import React from 'react';
import { Icon } from 'semantic-ui-react';
import './legal.styles.scss';

const LegalPage = () => (
    <div className="legal">
        <h2>Mentions Légales</h2>
        <h3>Présentation du site</h3>
        <h4>Propriétaire et Créateur</h4>
        <p>
            Marine Heckler, Développeur Web{' '}
            <a
                href="https://github.com/mariheck"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon name="external alternate" />
            </a>
            - Toulouse, France
        </p>
        <h4>Hébergeur</h4>
        <p>
            Heroku, Salesforce - 415 Mission Street, Suite 300, San Francisco,
            CA 94105, USA
        </p>

        <h3>Propriété intellectuelle</h3>
        <p>
            Ce site a été conçu dans le but de donner un apperçu de la page
            administrateur du site{' '}
            <a
                href="https://saving-portfolio.herokuapp.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://saving-portfolio.herokuapp.com/
            </a>
            . Tout contenu (photographies, vidéos, textes) est soumis aux droits
            d'auteur et sont la propriété de leur créateur, Saving - Anthony P.
        </p>
    </div>
);

export default LegalPage;
