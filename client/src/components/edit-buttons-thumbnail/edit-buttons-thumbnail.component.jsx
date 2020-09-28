import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './edit-buttons-thumbnail.styles.scss';

const EditButtonsThumbnail = ({
    id,
    typeOfFile,
    collectionOfFile,
    onDeleteRequest
}) => (
    <div className="edit-buttons-thumbnail">
        <Link to={`/${typeOfFile}/${collectionOfFile}/${id}/editer`}>
            <Icon name="edit outline" size="big" />
        </Link>

        <Icon
            name="trash alternate outline"
            size="big"
            onClick={() => onDeleteRequest(true, id)}
        />
    </div>
);

export default EditButtonsThumbnail;
