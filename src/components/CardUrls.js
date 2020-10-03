import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, CardHeader, Container, CardActions, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import {
    FileCopyOutlined as FileCopyOutlinedIcon,
    OpenInBrowser,
    Edit as EditIcon,
    Visibility as VisibilityIcon,
    DeleteForever as DeleteForeverIcon,
    Lock as LockIcon,
    LockOpen as LockOpenIcon
 } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    cardActions: {
        justifyContent: "space-around",
    },
    copyButton: {
        justifyContent: "flex-end",
    },
    chip: {
        color: "white"
    }
}));

export default function CardUrls(props) {
    const classes = useStyles();

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {props.shortUrls.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardHeader
                                action={

                                    <IconButton color="primary" className={classes.copyButton} onClick={() => { navigator.clipboard.writeText(window.location.origin + "/" + card.data.curl) }}>
                                        <FileCopyOutlinedIcon />
                                    </IconButton>
                                }
                                title={
                                    <Tooltip title={card.data.track === true ? "Link Tracking ON" : "Link Tracking OFF"}>
                                        <Badge color={card.data.track === true ? "primary" : "error"} variant="dot">
                                            <Typography>{card.data.curl}</Typography>
                                        </Badge>
                                    </Tooltip>
                                }
                                titleTypographyProps={{
                                    variant: "subtitle1"
                                }}
                            >

                            </CardHeader>
                            <CardContent className={classes.cardContent}>
                                <Box bgcolor="text.primary" color="background.paper" p={2} style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: "nowrap" }}>
                                    {card.data.lurl}
                                </Box>
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                                <IconButton size="small" color="primary" href={card.data.lurl} target="_blank">
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton size="small" onClick={() => props.handleEditShortUrl(card.data.curl)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton size="small" color="secondary" onClick={() => props.handleDeleteShortUrl(card.data.curl)}>
                                    <DeleteForeverIcon />
                                </IconButton>
                                <Tooltip title={card.data.hits + " Hits"}>
                                    <IconButton onClick={() => { props.openHits(card.data.curl) }} style={{ cursor: "pointer" }}>
                                        <Badge badgeContent={card.data.hits} color="secondary" max={Infinity} showZero>
                                            <OpenInBrowser />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <IconButton size='small' color='default' onClick={() => props.toggleSecurity(card.data.curl)}>
                                    {card.data.locked ? <LockIcon /> : <LockOpenIcon />}
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}