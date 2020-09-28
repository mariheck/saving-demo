import React, { Fragment } from 'react';
import Header from '../header/header.component';
import Menu from '../menu/menu.component';
import Footer from '../footer/footer.component';
import Snackbar from '../snackbar/snackbar.component';
import './page-wrapper.styles.scss';

const PageWrapper = ({
    children,
    isMenuHidden,
    snackbar,
    onToggleMenu,
    onSnackbarDisplay
}) => (
    <Fragment>
        <Header onToggleMenu={onToggleMenu} />
        <div className="container">
            <Menu
                isMenuHidden={isMenuHidden}
                onToggleMenu={onToggleMenu}
                onSnackbarDisplay={onSnackbarDisplay}
            />
            <main className={`${isMenuHidden ? '' : 'darker'}`}>
                {children}
                <Footer />
            </main>
        </div>

        {snackbar.display ? (
            <Snackbar
                alert={snackbar.alert}
                message={snackbar.message}
                icon={snackbar.icon}
            />
        ) : null}
    </Fragment>
);

export default PageWrapper;
