import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PageWrapper from './components/page-wrapper/page-wrapper.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Spinner from './components/spinner/spinner.component';

const GalleryPage = lazy(() => import('./pages/gallery/gallery.component'));
const FullscreenDisplayPage = lazy(() =>
    import('./pages/fullscreen-display/fullscreen-display.component')
);
const BioPage = lazy(() => import('./pages/bio/bio.component'));
const ContactPage = lazy(() => import('./pages/contact/contact.component'));
const LegalPage = lazy(() => import('./pages/legal/legal.component'));
const CreateAndEditPage = lazy(() =>
    import('./pages/create-and-edit/create-and-edit.component')
);

class App extends React.Component {
    state = {
        isMenuHidden: true,
        isAdminLoggedIn: true,
        snackbar: { display: false, alert: '', message: '', icon: '' }
    };

    onToggleMenu = () => {
        const newMenuState = !this.state.isMenuHidden;
        this.setState({ ...this.state, isMenuHidden: newMenuState });
    };

    onSnackbarDisplay = snackbar => {
        this.setState({
            ...this.state,
            snackbar
        });
        setTimeout(
            () =>
                this.setState({
                    ...this.state,
                    snackbar: {
                        display: false,
                        alert: '',
                        message: '',
                        icon: ''
                    }
                }),
            3500
        );
    };

    render() {
        const { isMenuHidden, isAdminLoggedIn, snackbar } = this.state;

        return (
            <PageWrapper
                isMenuHidden={isMenuHidden}
                snackbar={snackbar}
                onToggleMenu={this.onToggleMenu}
                onSnackbarDisplay={this.onSnackbarDisplay}
            >
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <GalleryPage
                                        isAdminLoggedIn={isAdminLoggedIn}
                                        typeOfFile="photos"
                                        fullScreenDisplay
                                        onSnackbarDisplay={
                                            this.onSnackbarDisplay
                                        }
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/photos"
                                render={() => <Redirect to="/" />}
                            />
                            <Route
                                exact
                                path="/photos/overview"
                                render={() => <Redirect to="/" />}
                            />
                            <Route
                                exact
                                path="/photos/:collectionTag"
                                render={() => (
                                    <GalleryPage
                                        isAdminLoggedIn={isAdminLoggedIn}
                                        typeOfFile="photos"
                                        fullScreenDisplay
                                        onSnackbarDisplay={
                                            this.onSnackbarDisplay
                                        }
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/photos/:collectionTag/ajouter"
                                render={() =>
                                    isAdminLoggedIn ? (
                                        <CreateAndEditPage
                                            typeOfFile="photos"
                                            action="add"
                                            onSnackbarDisplay={
                                                this.onSnackbarDisplay
                                            }
                                        />
                                    ) : (
                                        <Redirect to="/" />
                                    )
                                }
                            />
                            <Route
                                exact
                                path="/photos/:collectionTag/:fileId/editer"
                                render={() =>
                                    isAdminLoggedIn ? (
                                        <CreateAndEditPage
                                            typeOfFile="photos"
                                            action="edit"
                                            onSnackbarDisplay={
                                                this.onSnackbarDisplay
                                            }
                                        />
                                    ) : (
                                        <Redirect to="/" />
                                    )
                                }
                            />
                            <Route
                                path="/photos/:collectionTag/:fileId"
                                render={() => (
                                    <FullscreenDisplayPage
                                        typeOfFile="photos"
                                        onSnackbarDisplay={
                                            this.onSnackbarDisplay
                                        }
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/videos"
                                render={() => (
                                    <GalleryPage
                                        isAdminLoggedIn={isAdminLoggedIn}
                                        typeOfFile="videos"
                                        mainFileOverview
                                        onSnackbarDisplay={
                                            this.onSnackbarDisplay
                                        }
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/videos/overview"
                                render={() => <Redirect to="/videos" />}
                            />
                            <Route
                                exact
                                path="/videos/:collectionTag/ajouter"
                                render={() =>
                                    isAdminLoggedIn ? (
                                        <CreateAndEditPage
                                            typeOfFile="videos"
                                            action="add"
                                            onSnackbarDisplay={
                                                this.onSnackbarDisplay
                                            }
                                        />
                                    ) : (
                                        <Redirect to="/" />
                                    )
                                }
                            />
                            <Route
                                exact
                                path="/videos/:collectionTag/:fileId/editer"
                                render={() =>
                                    isAdminLoggedIn ? (
                                        <CreateAndEditPage
                                            typeOfFile="videos"
                                            action="edit"
                                            onSnackbarDisplay={
                                                this.onSnackbarDisplay
                                            }
                                        />
                                    ) : (
                                        <Redirect to="/" />
                                    )
                                }
                            />
                            <Route exact path="/bio" component={BioPage} />
                            <Route
                                exact
                                path="/contact"
                                render={() => (
                                    <ContactPage
                                        onSnackbarDisplay={
                                            this.onSnackbarDisplay
                                        }
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/mentions"
                                component={LegalPage}
                            />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </PageWrapper>
        );
    }
}

export default App;
