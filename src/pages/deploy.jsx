import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import '../style/deploy.css';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        width: '200px',
        height: '50px',
        marginLeft: '20px',
        marginRight: '20px',
        borderRadius: '15px',
    },
    buttonSecondary: {
        width: '180px',
        margin: '20px auto',
    },
    steps: {
        fontSize: '18px',
        paddingLeft: '20px',
        lineHeight: '28px',
        marginTop: '24px',
    },
    bold: {
        fontWeight: 600,
    },
    input: {
        display: 'none',
    },
}));

const design1 = () => {
    window.location.href = './portfolio';
};

const design2 = () => {
    window.location.href = './portfolio2';
};
const design3 = () => {
    window.location.href = './portfolio3';
};
const design4 = () => {
    window.location.href = './portfolio4';
};
const design5 = () => {
    window.location.href = './portfolio5';
};
const navToTutorial = () => {
    window.location.href = 'https://youtu.be/nJmQA7kpay4';
};

const Deploy = () => {
    const classes = useStyles();
    return (
        <div className="fullScreenInside">
            <div>
                <Typography variant="h4" className={classes.bold}>
                    To deploy your website -
                </Typography>
                <Typography className={classes.steps}>
                    <b>1)</b> Create a github account
                    <br />
                    <b>2)</b> Create a new repository in your account with the
                    name as username.github.io where username is your github
                    username.
                    <br />
                    <b>3)</b> Click the Download button on the homepage to a
                    download a file named - &quot;file.json&quot;
                    <br />
                    <b>4)</b> Choose a design template from below, download it
                    and unzip it.
                    <br />
                    <b>5)</b> Place your file.json in the foldernamed
                    &quot;data&quot; inside the unzipped content. If prompted,
                    replace the existing file.
                    <br />
                    <b>6)</b> On your github repository, click &quot;add
                    existing files&quot; and drag the entire content in the
                    unzipped folder to the browser in order to upload them.
                    <br />
                    <b>7)</b> Click on done, and wait for the files to upload.
                    In a couple of minutes your website should become live on
                    the url - username.github.io
                </Typography>
            </div>
            <div className="buttonRow">
                <div className="buttonColumn">
                    <a
                        href="https://drive.google.com/file/d/1OeiQuIqxdQqUUCwLIYFt4kICAee7MV8H/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ textDecoration: 'none' }}
                            className={classes.button}
                        >
                            Design 1
                        </Button>
                    </a>
                    <br />
                    <Button variant="outlined" onClick={design1}>
                        View
                    </Button>
                </div>
                <div className="buttonColumn">
                    <a
                        href="https://drive.google.com/file/d/1mexg-1PMUwHRGEw_867gh2cBzgTQrUm5/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ textDecoration: 'none' }}
                            className={classes.button}
                        >
                            Design 2
                        </Button>
                    </a>
                    <br />
                    <Button variant="outlined" onClick={design2}>
                        View
                    </Button>
                </div>
                <div className="buttonColumn">
                    <a
                        href="https://drive.google.com/file/d/1otuB3bhpj3sTzD4nfD36Ka2iC31ctbdx/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ textDecoration: 'none' }}
                            className={classes.button}
                        >
                            Design 3
                        </Button>
                    </a>
                    <br />
                    <Button variant="outlined" onClick={design3}>
                        View
                    </Button>
                </div>
                <div className="buttonColumn">
                    <a
                        href="https://drive.google.com/file/d/1f4-ApI2y0BvPBXg1vTbeei2JKT98SeZ5/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ textDecoration: 'none' }}
                            className={classes.button}
                        >
                            Design 4
                        </Button>
                    </a>
                    <br />
                    <Button variant="outlined" onClick={design4}>
                        View
                    </Button>
                </div>
                <div className="buttonColumn">
                    <a
                        href="https://drive.google.com/file/d/1SVP10TfhC6YRbXurcz5MCgHs0m0XjAak/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ textDecoration: 'none' }}
                            className={classes.button}
                        >
                            Design 5
                        </Button>
                    </a>
                    <br />
                    <Button variant="outlined" onClick={design5}>
                        View
                    </Button>
                </div>
            </div>
            <Button
                variant="outlined"
                className={classes.buttonSecondary}
                onClick={navToTutorial}
            >
                Tutorial
            </Button>
        </div>
    );
};

export default Deploy;
