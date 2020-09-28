import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import EditButtonsThumbnail from '../edit-buttons-thumbnail/edit-buttons-thumbnail.component';
import './thumbnail.styles.scss';

const Thumbnail = ({
    file,
    typeOfFile,
    collectionOfFile,
    large = false,
    addButton = false,
    editing = false,
    onDisplay = null,
    onDeleteRequest = null
}) => (
    <li
        className={`thumbnail ${typeOfFile}-thumbnail ${
            addButton
                ? `add-button-thumbnail ${typeOfFile}-add-button-thumbnail`
                : large
                ? 'large-thumbnail'
                : ''
        }`}
    >
        {addButton ? (
            <Link to={`/${typeOfFile}/${collectionOfFile}/ajouter`}>
                <Icon name="plus" size="big" />
            </Link>
        ) : typeOfFile === 'photos' ? (
            <img
                src={file.src}
                alt={file._id}
                className={large ? 'large-content' : ''}
            />
        ) : typeOfFile === 'videos' ? (
            <ReactPlayer
                url={file.src}
                width={large ? '90%' : '100%'}
                height={large ? '90%' : '100%'}
                className={large ? 'large-content' : ''}
                controls={large}
                muted={large}
                playing={large}
            />
        ) : null}

        {onDisplay && !editing && !addButton ? (
            <div
                className="thumbnail-overlay"
                onClick={() => onDisplay(file._id)}
            />
        ) : null}

        {editing && onDeleteRequest && !addButton ? (
            <EditButtonsThumbnail
                id={file._id}
                typeOfFile={typeOfFile}
                collectionOfFile={collectionOfFile}
                onDeleteRequest={onDeleteRequest}
            />
        ) : null}
    </li>
);

export default Thumbnail;
