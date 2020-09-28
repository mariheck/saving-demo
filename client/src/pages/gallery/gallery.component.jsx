import React from 'react';
import { withRouter } from 'react-router-dom';
import { SERVER_URL } from '../../utils/constants';
import Thumbnail from '../../components/thumbnail/thumbnail.component';
import DeleteFileConfirmation from '../../components/delete-file-confirmation/delete-file-confirmation.component';
import Spinner from '../../components/spinner/spinner.component';
import './gallery.styles.scss';

class GalleryPage extends React.Component {
    state = {
        files: [],
        mainFile: {},
        collections: [],
        collectionToDisplay: {},
        isDeletingMessageDisplayed: false,
        fileToDelete: {},
        isDbEmpty: false
    };

    async componentDidMount() {
        await this.fetchCollections();
        await this.fetchFiles();
    }

    async componentDidUpdate(prevProps) {
        if (
            this.props.location.pathname !== prevProps.location.pathname &&
            this.props.typeOfFile === prevProps.typeOfFile
        ) {
            this.setState({
                ...this.state,
                collectionToDisplay: this.state.collections.filter(
                    collection => {
                        const filterParam = this.props.match.params
                            .collectionTag
                            ? this.props.match.params.collectionTag
                            : 'overview';
                        return collection.tag === filterParam;
                    }
                )[0]
            });
        }

        if (this.props.typeOfFile !== prevProps.typeOfFile) {
            await this.fetchCollections();
            await this.fetchFiles();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.files !== nextState.files ||
            this.state.mainFile !== nextState.mainFile ||
            this.state.collectionToDisplay !== nextState.collectionToDisplay ||
            this.state.isDeletingMessageDisplayed !==
                nextState.isDeletingMessageDisplayed ||
            this.props.location !== nextProps.location ||
            this.props.typeOfFile !== nextProps.typeOfFile
        ) {
            return true;
        }
        return false;
    }

    fetchCollections = async () => {
        await fetch(`${SERVER_URL}/collections/${this.props.typeOfFile}`, {
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
                    collections
                });
            })
            .catch(error => {
                this.props.onSnackbarDisplay({
                    display: true,
                    message: 'Erreur lors du chargement.'
                });
            });
    };

    fetchFiles = async () => {
        await fetch(`${SERVER_URL}/files/${this.props.typeOfFile}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (!response.ok) throw new Error();
                else return response.json();
            })
            .then(data => {
                this.setState({
                    ...this.state,
                    files: data.reverse(),
                    mainFile: data[0],
                    collectionToDisplay: this.state.collections.filter(
                        collection => {
                            const filterParam = this.props.match.params
                                .collectionTag
                                ? this.props.match.params.collectionTag
                                : 'overview';
                            return collection.tag === filterParam;
                        }
                    )[0],
                    isDbEmpty: false
                });

                if (!data.length) {
                    this.setState({ ...this.state, isDbEmpty: true });
                }
            })
            .catch(error => {
                this.props.onSnackbarDisplay({
                    display: true,
                    message: 'Erreur lors du chargement.'
                });
            });
    };

    destroyFile = async fileId => {
        await fetch(`${SERVER_URL}/files/${this.props.typeOfFile}/${fileId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (!response.ok) throw new Error();
                else return response.json();
            })
            .then(resp => {
                this.props.onSnackbarDisplay({
                    display: true,
                    alert: 'success',
                    message: 'Supprimé avec succès !'
                });
            })
            .catch(error => {
                this.props.onSnackbarDisplay({
                    display: true,
                    alert: 'error',
                    message: 'Erreur lors de la suppression.'
                });
            });

        this.setState({
            ...this.state,
            isDeletingMessageDisplayed: false,
            fileToDelete: {}
        });
    };

    onFileFullscreen = fileId => {
        if (!this.props.isAdminLoggedIn) {
            this.props.history.push(
                `/${this.props.typeOfFile}/${this.state.collectionToDisplay.tag}/${fileId}`
            );
        }
    };

    onChangeMainFile = fileId => {
        const newFile = this.state.files.find(file => file._id === fileId);
        this.setState({ ...this.state, mainFile: newFile });
    };

    onDeleteRequest = (isDeletingMessageDisplayed, fileId) => {
        const fileToDelete = this.state.files.find(file => file._id === fileId);
        this.setState({
            ...this.state,
            isDeletingMessageDisplayed,
            fileToDelete
        });
    };

    onDeleteFile = async fileId => {
        await this.destroyFile(fileId);
        await this.fetchFiles();
    };

    render() {
        // Props
        const {
            isAdminLoggedIn,
            typeOfFile,
            mainFileOverview,
            fullScreenDisplay
        } = this.props;

        // State
        const {
            files,
            mainFile,
            collectionToDisplay,
            isDeletingMessageDisplayed,
            fileToDelete,
            isDbEmpty
        } = this.state;

        // Deleting Message - Asks for delete confirmation
        const deletingMessage = isDeletingMessageDisplayed ? (
            <DeleteFileConfirmation
                typeOfFile={typeOfFile}
                fileToDelete={fileToDelete}
                onDeleteRequest={this.onDeleteRequest}
                onDelete={this.onDeleteFile}
            />
        ) : null;

        // Main Thumbnail - When main file overview is requested
        const mainThumbnail =
            files.length && !isAdminLoggedIn && mainFileOverview ? (
                <div className="main-file-container">
                    <Thumbnail
                        key={mainFile._id}
                        file={mainFile}
                        typeOfFile={typeOfFile}
                        large
                    />
                </div>
            ) : null;

        // Add File Button
        const addFileButton = isAdminLoggedIn ? (
            <Thumbnail
                typeOfFile={typeOfFile}
                collectionOfFile={collectionToDisplay.tag}
                addButton
            />
        ) : null;

        // Spinner Display
        const displaySpinner =
            !isAdminLoggedIn && !isDbEmpty ? <Spinner /> : null;

        // Empty DB Message
        const emptyDbMessage =
            isDbEmpty && !isAdminLoggedIn ? (
                typeOfFile === 'photos' ? (
                    <p className="no-file-message">Aucune photo disponible.</p>
                ) : typeOfFile === 'videos' ? (
                    <p className="no-file-message">Aucune vidéo disponible.</p>
                ) : null
            ) : null;

        return (
            <div className="gallery">
                {deletingMessage}
                {mainThumbnail}

                <ul className="files-list">
                    {addFileButton}

                    {files.length
                        ? files.map(file => {
                              if (
                                  file.collections.includes(
                                      collectionToDisplay._id
                                  )
                              ) {
                                  return (
                                      <Thumbnail
                                          key={file._id}
                                          file={file}
                                          typeOfFile={typeOfFile}
                                          collectionOfFile={
                                              collectionToDisplay.tag
                                          }
                                          editing={isAdminLoggedIn}
                                          onDisplay={
                                              fullScreenDisplay
                                                  ? this.onFileFullscreen
                                                  : mainFileOverview
                                                  ? this.onChangeMainFile
                                                  : null
                                          }
                                          onDeleteRequest={
                                              isAdminLoggedIn
                                                  ? this.onDeleteRequest
                                                  : null
                                          }
                                      />
                                  );
                              }
                              return null;
                          })
                        : displaySpinner}
                </ul>

                {emptyDbMessage}
            </div>
        );
    }
}

export default withRouter(GalleryPage);
