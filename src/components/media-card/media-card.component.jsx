import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

import styled from 'styled-components';

const CardContainer = styled.div`
    max-width: 500px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        max-width: 300px;
    }
`;

const ImageContainer = styled.div`
    height: 0px;
    padding-top: 66.8%;
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
    background-size: contain;
    background-repeat: no-repeat;
`;

export default function MediaCard({ imageUrl, title, info, link }) {
    const refLike = useRef();

    useEffect(() => {
        const { current } = refLike;

        const handleClick = () => {
            current.style.color =
                current.style.color !== 'red' ? 'red' : 'rgba(0, 0, 0, 0.54)';
        };
        current.addEventListener('click', handleClick);

        return () => {
            current.removeEventListener('click', handleClick);
        };
    });

    return (
        <CardContainer>
            <CardActionArea>
                <ImageContainer imageUrl={imageUrl} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {info}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="add to favorites" ref={refLike}>
                    <FavoriteIcon />
                </IconButton>
                <Button variant="contained" color="secondary" size="small">
                    <a href={link}>See Website</a>
                </Button>
            </CardActions>
        </CardContainer>
    );
}

MediaCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};
