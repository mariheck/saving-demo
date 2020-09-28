import React, { Fragment } from 'react';
import ReactPlayer from 'react-player';
import CustomButton from '../custom-button/custom-button.component';
import './delete-file-confirmation.styles.scss';

const DeleteFileConfirmation = ({
    fileToDelete,
    typeOfFile,
    onDeleteRequest,
    onDelete
}) => {
    return (
        <Fragment>
            <div
                className="delete-file-overlay"
                onClick={() => onDeleteRequest(false, null)}
            />

            <div className="delete-file-confirmation">
                <h3>
                    Supprimer{' '}
                    {typeOfFile === 'photos'
                        ? 'cette photo '
                        : typeOfFile === 'videos'
                        ? 'cette vidéo '
                        : null}
                    ?
                </h3>

                {typeOfFile === 'videos' ? (
                    <div className="video-display">
                        <ReactPlayer
                            url={fileToDelete.src}
                            width="100%"
                            height="100%"
                        />
                    </div>
                ) : typeOfFile === 'photos' ? (
                    <img
                        src={fileToDelete.src}
                        alt={fileToDelete._id}
                        className="photo-display"
                    />
                ) : null}

                <div className="buttons-wrapper">
                    <CustomButton
                        onButtonAction={() => onDelete(fileToDelete._id)}
                    >
                        Confirmer
                    </CustomButton>
                    <CustomButton
                        color="red"
                        onButtonAction={() => onDeleteRequest(false, null)}
                    >
                        Annuler
                    </CustomButton>
                </div>
            </div>
        </Fragment>
    );
};

export default DeleteFileConfirmation;
