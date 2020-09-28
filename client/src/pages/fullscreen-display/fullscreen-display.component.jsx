import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import { SERVER_URL } from '../../utils/constants';
import Spinner from '../../components/spinner/spinner.component';
import './fullscreen-display.styles.scss';

class FullscreenDisplayPage extends React.Component {
    state = {
        fileToDisplay: '',
        collectionFiles: []
    };

    componentDidMount() {
        fetch(
            `${SERVER_URL}/collections/${this.props.typeOfFile}/${this.props.match.params.collectionTag}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        )
            .then(response => {
                if (!response.ok) throw new Error();
                else return response.json();
            })
            .then(collection => {
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
                    .then(file =>
                        this.setState({
                            ...this.state,
                            fileToDisplay: file.src,
                            collectionFiles: collection[
                                this.props.typeOfFile
                            ].reverse()
                        })
                    )
                    .catch(error => {
                        this.props.onSnackbarDisplay({
                            display: true,
                            message: 'Erreur lors du chargement.'
                        });
                        this.props.history.push(
                            `/${this.props.typeOfFile}/${this.props.match.params.collectionTag}`
                        );
                    });
            })
            .catch(error => {
                this.props.onSnackbarDisplay({
                    display: true,
                    message: 'Erreur lors du chargement.'
                });
                this.props.history.push(
                    `/${this.props.typeOfFile}/${this.props.match.params.collectionTag}`
                );
            });
    }

    onChangeFile = direction => {
        // Directions are +1 for next photo or -1 for previous photo

        let fileIndex =
            this.state.collectionFiles.indexOf(this.props.match.params.fileId) +
            direction;
        if (fileIndex === -1) {
            fileIndex = this.state.collectionFiles.length - 1;
        } else if (fileIndex === this.state.collectionFiles.length) {
            fileIndex = 0;
        }

        fetch(
            `${SERVER_URL}/files/${this.props.typeOfFile}/${this.state.collectionFiles[fileIndex]}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        )
            .then(response => {
                if (!response.ok) throw new Error();
                else return response.json();
            })
            .then(file => {
                this.setState({
                    ...this.state,
                    fileToDisplay: file.src
                });
                this.props.history.push(
                    `/${this.props.typeOfFile}/${this.props.match.params.collectionTag}/${this.state.collectionFiles[fileIndex]}`
                );
            })
            .catch(error => {
                this.props.onSnackbarDisplay({
                    display: true,
                    message: 'Erreur lors du chargement.'
                });
                this.props.history.push(
                    `/${this.props.typeOfFile}/${this.props.match.params.collectionTag}`
                );
            });
    };

    render() {
        const { history, match, typeOfFile } = this.props;
        const { fileToDisplay } = this.state;

        return (
            <div className="fullscreen-display">
                <div className="copyright">
                    <p>Saving © {new Date().getFullYear()}</p>
                </div>

                <div className="file-container">
                    {fileToDisplay ? (
                        typeOfFile === 'photos' ? (
                            <img
                                src={fileToDisplay}
                                alt={match.params.fileId}
                            />
                        ) : typeOfFile === 'videos' ? (
                            <ReactPlayer
                                url={fileToDisplay}
                                className="video"
                                width="90%"
                                height="90%"
                                controls
                                playing
                            />
                        ) : null
                    ) : (
                        <Spinner />
                    )}
                </div>

                <div className="file-navigation">
                    <div className="navigation-arrows">
                        <Icon
                            name="step backward"
                            size="large"
                            onClick={() => this.onChangeFile(-1)}
                        />
                        <Icon
                            name="step forward"
                            size="large"
                            onClick={() => this.onChangeFile(1)}
                        />
                    </div>

                    <div className="navigation-close">
                        <Icon
                            name="compress"
                            size="large"
                            onClick={() =>
                                history.push(
                                    `/${typeOfFile}/${match.params.collectionTag}`
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(FullscreenDisplayPage);
