const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
} else {
    app.use(cors());
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

//======================================================
// DATABASE
//======================================================

let db = {
    photosCollections: [
        {
            _id: 1,
            name: 'Overview',
            tag: 'overview',
            photos: [
                101,
                102,
                103,
                104,
                105,
                106,
                107,
                108,
                109,
                110,
                111,
                112,
                113,
                114
            ]
        },
        {
            _id: 2,
            name: 'Portrait',
            tag: 'portrait',
            photos: [101, 104, 107, 108, 109, 114]
        },
        { _id: 3, name: 'Street', tag: 'street', photos: [102, 103, 110] },
        { _id: 4, name: 'Move', tag: 'move', photos: [106, 111, 112, 113] },
        { _id: 5, name: 'The Eye', tag: 'the-eye', photos: [105] }
    ],
    videosCollections: [
        {
            _id: 201,
            name: 'Overview',
            tag: 'overview',
            videos: [301, 302, 303, 304]
        }
    ],
    photos: [
        {
            _id: 101,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_0880.jpg?alt=media&token=c0a036a4-dd0b-478f-8c3a-1a96480c4418',
            collections: [1, 2]
        },
        {
            _id: 102,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_2902.jpg?alt=media&token=345d8b13-e96e-4ecd-be21-6b418d751a16',
            collections: [1, 3]
        },
        {
            _id: 103,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_4550.jpg?alt=media&token=47cbc557-d6ae-4421-9a58-1e4af86752dc',
            collections: [1, 3]
        },
        {
            _id: 104,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_2633-Modifier.jpg?alt=media&token=cbdf9c68-9c12-4aeb-ba36-09d73c509390',
            collections: [1, 2]
        },
        {
            _id: 105,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FTE_Ep0_1.jpg?alt=media&token=4ae667ed-8ab7-4b33-b8ee-1e051366c2c8',
            collections: [1, 5]
        },
        {
            _id: 106,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_9410.jpg?alt=media&token=2aaea388-bfcc-43e9-8903-953662e700c7',
            collections: [1, 4]
        },
        {
            _id: 107,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_2294.jpg?alt=media&token=0504afa4-2686-426d-a87a-c216f4cd02ef',
            collections: [1, 2]
        },
        {
            _id: 108,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_9240.jpg?alt=media&token=6efae61b-47d0-4f65-916a-1b79caa32758',
            collections: [1, 2]
        },
        {
            _id: 109,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_3929.jpg?alt=media&token=f82474aa-4563-418f-914b-0e479065b03d',
            collections: [1, 2]
        },
        {
            _id: 110,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_2735.jpg?alt=media&token=4cbac4ff-56f3-4598-9236-15770c1a4dc7',
            collections: [1, 3]
        },
        {
            _id: 111,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_9491.jpg?alt=media&token=0d9ca663-ed89-4cad-ae0a-aab1cbb8ef83',
            collections: [1, 4]
        },
        {
            _id: 112,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_9359.jpg?alt=media&token=dc990785-4044-450e-9a72-de47035d9036',
            collections: [1, 4]
        },
        {
            _id: 113,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2FIMG_8938.jpg?alt=media&token=31b2127b-7ad9-4195-bbcb-2da57158ef7c',
            collections: [1, 4]
        },
        {
            _id: 114,
            src:
                'https://firebasestorage.googleapis.com/v0/b/saving-portfolio-1ada9.appspot.com/o/photos%2F29052016-IMG_3326-Modifier.jpg?alt=media&token=f8fa37f8-5d2e-4c36-b2c4-6ee274566373',
            collections: [1, 2]
        }
    ],
    videos: [
        {
            _id: 301,
            src:
                'https://www.facebook.com/1399492470372214/videos/1507652326222894',
            collections: [201]
        },
        {
            _id: 302,
            src:
                'https://www.facebook.com/1399492470372214/videos/1537536676567792',
            collections: [201]
        },
        {
            _id: 303,
            src:
                'https://www.facebook.com/1399492470372214/videos/1544046285916831',
            collections: [201]
        },
        {
            _id: 304,
            src:
                'https://www.facebook.com/1399492470372214/videos/1613895195598606',
            collections: [201]
        }
    ]
};

// ======================================================
// ROUTES
// ======================================================

// ==================================
// NODEMAILER SETTING
// ==================================

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.ACCOUNT,
        pass: process.env.PASS
    }
});

// ==================================
// NODEMAILER ROUTE
// ==================================

app.post('/message', (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailContent = `
    <p>
    ${name} </br> 
    ${email} </br> 
    ${phone} </br> 
    ${message}</p>`;

    const mailOptions = {
        from: process.env.ACCOUNT,
        to: process.env.ACCOUNT,
        subject: 'Saving - Nouveau Message',
        html: mailContent
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(info);
        }
    });
});

// ==================================
// FILES COLLECTIONS ROUTES
// ==================================

const pickCollection = typeOfFile => {
    if (typeOfFile === 'photos') {
        return 'photosCollections';
    } else if (typeOfFile === 'videos') {
        return 'videosCollections';
    } else {
        return null;
    }
};

// INDEX
app.get('/collections/:typeOfFile', (req, res) => {
    const { typeOfFile } = req.params;
    const collection = pickCollection(typeOfFile);

    res.json(db[collection]);
});

// CREATE
app.post('/collections/:typeOfFile', (req, res) => {
    const { typeOfFile } = req.params;
    const { entry } = req.body;
    const collection = pickCollection(typeOfFile);

    const newCollection = {
        _id: db[collection][db[collection].length - 1]._id + 1,
        name: _.startCase(_.toLower(_.trim(entry))),
        tag: _.kebabCase(_.toLower(_.trim(entry))),
        [typeOfFile]: []
    };

    db[collection].push(newCollection);
    res.status(200).json('Collection saved in database.');
});

// SHOW
app.get('/collections/:typeOfFile/:collectionTag', (req, res) => {
    const { typeOfFile, collectionTag } = req.params;
    const collection = pickCollection(typeOfFile);

    const requestedCollection = db[collection].find(
        currentCollection => currentCollection.tag === collectionTag
    );

    const requestedCollectionFilesId = requestedCollection[
        typeOfFile
    ].map(fileId => fileId.toString());

    requestedCollection[typeOfFile] = requestedCollectionFilesId;

    if (requestedCollection) {
        res.json(requestedCollection);
    } else {
        res.status(400).json("Collection doesn't exist.");
    }
});

// UPDATE
app.put('/collections/:typeOfFile/:collectionTag', (req, res) => {
    const { typeOfFile, collectionTag } = req.params;
    const { entry } = req.body;
    const collection = pickCollection(typeOfFile);

    const updatedCollection = db[collection].filter(
        currentCollection => currentCollection.tag === collectionTag
    );

    if (updatedCollection.length) {
        const collectionToUpdateIndex = db[collection].indexOf(
            updatedCollection[0]
        );

        updatedCollection[0].name = _.startCase(_.toLower(_.trim(entry)));
        updatedCollection[0].tag = _.kebabCase(_.toLower(_.trim(entry)));

        db[collection][collectionToUpdateIndex] = updatedCollection[0];

        res.status(200).json('Collection saved in database.');
    } else {
        res.status(400).json("Requested collection doesn't exist.");
    }
});

// DESTR0Y
app.delete('/collections/:typeOfFile/:collectionTag', (req, res) => {
    const { typeOfFile, collectionTag } = req.params;
    const collection = pickCollection(typeOfFile);

    const collectionToDelete = db[collection].filter(
        currentCollection => currentCollection.tag === collectionTag
    );

    if (collectionToDelete.length) {
        if (collectionToDelete[typeOfFile].length) {
            res.status(400).json(
                "Coudln't remove the collection from the database : collection not empty."
            );
        } else {
            const newCollections = db[collection].filter(
                currentCollection => currentCollection.tag !== collectionTag
            );

            db = { ...db, [collection]: newCollections };

            res.status(200).json('Collection removed from database.');
        }
    } else {
        res.status(400).json("Requested collection doesn't exist.");
    }
});

// ==================================
// FILES ROUTES
// ==================================

// INDEX
app.get('/files/:typeOfFile', (req, res) => {
    const { typeOfFile } = req.params;

    res.json(db[typeOfFile]);
});

// CREATE
app.post('/files/:typeOfFile', (req, res) => {
    const { typeOfFile } = req.params;
    const { fileUrl, fileName, fileCollections } = req.body;
    const collection = pickCollection(typeOfFile);

    const newFile = {
        _id: db[typeOfFile][db[typeOfFile].length - 1]._id + 1,
        src: fileUrl,
        name: fileName,
        collections: []
    };

    const fileCollectionsId = [];

    db[collection].forEach(currentCollection => {
        if (fileCollections.includes(currentCollection.tag)) {
            currentCollection[typeOfFile].push(newFile._id);
            fileCollectionsId.push(currentCollection._id);
        }
    });

    newFile.collections = [...fileCollectionsId];
    db[typeOfFile].push(newFile);

    res.status(200).json('File saved in database.');
});

// SHOW MANY
app.get('/files/:typeOfFile/collection/:collectionTag', (req, res) => {
    const { typeOfFile, collectionTag } = req.params;
    const collection = pickCollection(typeOfFile);

    const collectionToShow = db[collection].filter(
        currentCollection => currentCollection.tag === collectionTag
    );

    if (!collectionToShow.length) {
        res.status(400).json("Collection doesn't exist.");
    } else {
        const filesToShow = db[typeOfFile].filter(currentFile =>
            collectionToShow[typeOfFile].includes(currentFile._id)
        );
        res.json(filesToShow);
    }
});

// SHOW
app.get('/files/:typeOfFile/:fileId', (req, res) => {
    const { typeOfFile, fileId } = req.params;

    const fileToShow = db[typeOfFile].find(
        currentFile => currentFile._id.toString() === fileId
    );

    if (!fileToShow) {
        res.status(400).status("Requested file doesn't exist.");
    } else {
        res.json(fileToShow);
    }
});

// UPDATE
app.put('/files/:typeOfFile/:fileId', (req, res) => {
    const { typeOfFile, fileId } = req.params;
    const { fileUrl, fileName, fileCollections } = req.body;
    const collection = pickCollection(typeOfFile);

    const updatedFile = db[typeOfFile].find(
        file => file._id.toString() === fileId
    );

    if (updatedFile) {
        const fileToUpdateIndex = db[typeOfFile].indexOf(updatedFile);

        updatedFile.src = fileUrl;
        updatedFile.name = fileName;

        const fileCollectionsId = [];

        db[collection].forEach(currentCollection => {
            if (fileCollections.includes(currentCollection.tag)) {
                if (!currentCollection[typeOfFile].includes(updatedFile._id))
                    currentCollection[typeOfFile].push(updatedFile._id);
                fileCollectionsId.push(currentCollection._id);
            } else {
                if (currentCollection[typeOfFile].includes(updatedFile._id)) {
                    const newCollectionFiles = currentCollection[
                        typeOfFile
                    ].filter(currentFile => currentFile !== updatedFile._id);
                    currentCollection[typeOfFile] = [...newCollectionFiles];
                }
            }
        });

        updatedFile.collections = [...fileCollectionsId];
        db[typeOfFile][fileToUpdateIndex] = updatedFile;

        res.status(200).json('File saved in database.');
    } else {
        res.status(400).json("Requested file doesn't exist.");
    }
});

// DESTROY
app.delete('/files/:typeOfFile/:fileId', (req, res) => {
    const { typeOfFile, fileId } = req.params;
    const collection = pickCollection(typeOfFile);

    const fileToDelete = db[typeOfFile].find(
        file => file._id.toString() === fileId
    );

    const fileToDeleteIndex = db[typeOfFile].indexOf(fileToDelete);

    db[typeOfFile][fileToDeleteIndex].collections.forEach(fileCollection => {
        const collectionToEdit = db[collection].find(
            currentCollection => currentCollection._id === fileCollection
        );

        const newCollectionFiles = collectionToEdit[typeOfFile].filter(
            currentFile => currentFile.toString() !== fileId
        );

        collectionToEdit[typeOfFile] = [...newCollectionFiles];
    });

    const newFiles = db[typeOfFile].filter(
        file => file._id.toString() !== fileId
    );

    db = { ...db, [typeOfFile]: newFiles };

    res.status(200).json('File removed from database.');
});

// ==================================
// OTHER ROUTES
// ==================================

// Serve the client part for any request from the user
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// ======================================================
// APP RUNNING
// ======================================================

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}.`);
});
