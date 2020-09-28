import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Icon } from 'semantic-ui-react';
import { SERVER_URL } from '../../utils/constants';
import CustomInput from '../../components/custom-input/custom-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './create-and-edit.styles.scss';

class CreateAndEditPage extends React.Component {
    state = {
        fileUrl: '',
        fileCollections: {},
        fileToEdit: { url: '' },
        collectionsList: [],
        continueAfterSaving: false
    };

    componentDidMount() {
        this.fetchCollections();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.collectionsList !== prevState.collectionsList) {
            if (this.props.action === 'edit') {
                this.fetchFile();
            } else if (this.props.action === 'add') {
                let newFileCollections = {};

                this.state.collectionsList.forEach(collection => {
                    newFileCollections = {
                        ...newFileCollections,
                        [collection.tag]: false
                    };
                });

                this.setState({
                    ...this.state,
                    fileCollections: {
                        ...newFileCollections,
                        overview: true,
                        [this.props.match.params.collectionTag]: true
                    }
                });
            }
        }
    }

    fetchCollections = () => {
        fetch(`${SERVER_URL}/collections/${this.props.typeOfFile}`, {
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
                    collectionsList: collections
                });
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    collectionsList: [
                        { id: 0, name: 'Overview', tag: 'overview' }
                    ]
                });
                this.props.onSnackbarDisplay({
                    display: true,
                    alert: 'error',
                    message: 'Collections impossibles à charger.'
                });
            });
    };

    fetchFile = () => {
        fetch(
            `${SERVER_URL}/files/${this.props.typeOfFile}/${this.props.match.params.fileId}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        )
            .then(response => {
                if (!response.ok) throw new Error();
                else return response.json();
            })
            .then(fileToEdit => {
                let fileCollections = {};

                this.state.collectionsList.forEach(collection => {
                    if (
                        fileToEdit.collections.find(
                            fileCollectionId =>
                                fileCollectionId === collection._id
                        )
                    ) {
                        fileCollections = {
                            ...fileCollections,
                            [collection.tag]: true
                        };
                    } else {
                        fileCollections = {
                            ...fileCollections,
                            [collection.tag]: false
                        };
                    }
                });

                this.setState({
                    ...this.state,
                    fileToEdit: {
                        url: fileToEdit.src
                    },
                    fileUrl: fileToEdit.src,
                    fileCollections
                });
            })
            .catch(error => {
                this.props.onSnackbarDisplay({
                    display: true,
                    alert: 'error',
                    message: 'Fichier impossible à charger.'
                });
                this.props.history.push(
                    `/${this.props.typeOfFile}/${this.props.match.params.collectionTag}`
                );
            });
    };

    onInitAddState = () => {
        let newFileCollections = {};

        this.state.collectionsList.forEach(collection => {
            newFileCollections = {
                ...newFileCollections,
                [collection.tag]: false
            };
        });

        this.setState({
            ...this.state,
            fileUrl: '',
            fileCollections: {
                ...newFileCollections,
                overview: true,
                [this.props.match.params.collectionTag]: true
            },
            warningMessage: false,
            continueAfterSaving: false
        });
    };

    onInputChange = event => {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    };

    onToggleCheckbox = event => {
        const { name, checked } = event.target;
        this.setState({
            ...this.state,
            fileCollections: { ...this.state.fileCollections, [name]: checked }
        });
    };

    onToggleContinue = () => {
        const continueAfterSaving = !this.state.continueAfterSaving;
        this.setState({ ...this.state, continueAfterSaving });
    };

    onSaveDocument = collections => {
        if (this.props.action === 'add') {
            fetch(`${SERVER_URL}/files/${this.props.typeOfFile}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileUrl: this.state.fileUrl,
                    fileCollections: collections
                })
            })
                .then(response => {
                    if (!response.ok) throw new Error();
                    else return response.json();
                })
                .then(resp => {
                    this.props.onSnackbarDisplay({
                        display: true,
                        alert: 'success',
                        message: 'Ajouté avec succès !'
                    });

                    if (!this.state.continueAfterSaving) {
                        this.props.history.push(
                            `/${this.props.typeOfFile}/${this.props.match.params.collectionTag}`
                        );
                    } else {
                        this.onInitAddState();
                    }
                })
                .catch(error => {
                    this.props.onSnackbarDisplay({
                        display: true,
                        alert: 'error',
                        message: 'Erreur lors de la sauvegarde.'
                    });
                });
        } else if (this.props.action === 'edit') {
            fetch(
                `${SERVER_URL}/files/${this.props.typeOfFile}/${this.props.match.params.fileId}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fileUrl: this.state.fileUrl,
                        fileCollections: collections
                    })
                }
            )
                .then(response => {
                    if (!response.ok) throw new Error();
                    else return response.json();
                })
                .then(resp => {
                    this.props.onSnackbarDisplay({
                        display: true,
                        alert: 'success',
                        message: 'Enregistré avec succès !'
                    });
                    this.props.history.push(
                        `/${this.props.typeOfFile}/${this.props.match.params.collectionTag}`
                    );
                })
                .catch(error => {
                    this.props.onSnackbarDisplay({
                        display: true,
                        alert: 'error',
                        message: 'Erreur lors de la sauvegarde.'
                    });
                });
        }
    };

    onFormSubmit = event => {
        event.preventDefault();

        if (this.state.fileUrl === '') {
            return this.props.onSnackbarDisplay({
                display: true,
                alert: 'error',
                message: "Aucun fichier n'a été renseigné !"
            });
        }

        let collections = [];
        for (const coll in this.state.fileCollections) {
            if (this.state.fileCollections[coll]) {
                collections = [...collections, coll];
            }
        }

        if (this.props.typeOfFile !== 'videos' && collections.length < 2) {
            return this.props.onSnackbarDisplay({
                display: true,
                alert: 'error',
                message: 'Sélectionner au moins une collection !'
            });
        }

        this.onSaveDocument(collections);
    };

    render() {
        // Props
        const { typeOfFile, action, history, match } = this.props;

        // State
        const {
            fileUrl,
            fileCollections,
            fileToEdit,
            collectionsList
        } = this.state;

        // Add File Preview - Displayed when no file yet
        const addFilePreview = (
            <div className={`preview icon-preview ${typeOfFile}-preview`}>
                {typeOfFile === 'photos' ? (
                    <Icon name="image outline" size="massive" />
                ) : typeOfFile === 'videos' ? (
                    <Icon name="video" size="massive" />
                ) : null}
            </div>
        );

        // Form Title
        const formTitle =
            action === 'add' ? (
                <h3>
                    {typeOfFile === 'photos'
                        ? 'Nouvelle photo'
                        : typeOfFile === 'videos'
                        ? 'Nouvelle vidéo'
                        : 'Création'}
                </h3>
            ) : action === 'edit' ? (
                <h3>Edition</h3>
            ) : null;

        // Photo Collections List
        const photoCollectionsList =
            typeOfFile === 'photos' ? (
                <div className="collections-list">
                    <p>Collections :</p>

                    {collectionsList.map(collection => (
                        <CustomInput
                            key={collection._id}
                            id={collection.tag}
                            type="checkbox"
                            name={collection.tag}
                            checked={fileCollections[collection.tag]}
                            label={collection.name}
                            handleChange={this.onToggleCheckbox}
                            disabled={
                                collection.tag === 'overview' ? true : false
                            }
                        />
                    ))}
                </div>
            ) : null;

        // Small Preview - Preview of the file before it was edited
        const smallPreview =
            action === 'edit' ? (
                typeOfFile === 'photos' ? (
                    <img src={fileToEdit.url} alt="edit" />
                ) : typeOfFile === 'videos' ? (
                    <ReactPlayer
                        url={fileToEdit.url}
                        width="100%"
                        height="100%"
                    />
                ) : null
            ) : null;

        return (
            <div className="create-and-edit">
                {fileUrl ? (
                    <div className={`preview ${typeOfFile}-preview`}>
                        {typeOfFile === 'photos' ? (
                            <img src={fileUrl} alt="edit" />
                        ) : typeOfFile === 'videos' ? (
                            <ReactPlayer
                                url={fileUrl}
                                width="100%"
                                height="100%"
                            />
                        ) : null}
                    </div>
                ) : (
                    addFilePreview
                )}

                <form onSubmit={this.onFormSubmit}>
                    {formTitle}

                    <CustomInput
                        id="fileUrl"
                        type="text"
                        name="fileUrl"
                        value={fileUrl}
                        label="URL du fichier"
                        handleChange={this.onInputChange}
                    />

                    <div className="file-info">
                        {photoCollectionsList}
                        <div className="small-preview">{smallPreview}</div>
                    </div>

                    <div className="buttons-wrapper">
                        <CustomButton type="submit">Enregistrer</CustomButton>
                        {action === 'add' ? (
                            <CustomButton
                                type="submit"
                                onButtonAction={this.onToggleContinue}
                            >
                                Enregistrer et Continuer
                            </CustomButton>
                        ) : null}
                        <CustomButton
                            color="red"
                            onButtonAction={() =>
                                history.push(
                                    `/${typeOfFile}/${match.params.collectionTag}`
                                )
                            }
                        >
                            Retour
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}
export default withRouter(CreateAndEditPage);
