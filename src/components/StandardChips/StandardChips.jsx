import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import {STANDARD_ACTIONS} from '../../redux/actions/standardActions';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class ChipsArray extends React.Component {
    
    state = {
        chipData: this.props.standards,
    };

    // handleDelete = data => () => {
    //     this.setState(state => {
    //         const chipData = [...state.chipData];
    //         const chipToDelete = chipData.indexOf(data);
    //         chipData.splice(chipToDelete, 1);
    //         return { chipData };
    //     });
    // };


    handleClick = (id) => {
        return () => {
            this.props.dispatch({
                type: STANDARD_ACTIONS.TAG_STANDARD,
                payload: id,
            });
        }   
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                {this.state.chipData.map((data, index) => {
                    return (
                        <Chip
                            key={index}
                            label={data.standard_name}
                            onClick={this.handleClick(data.id)}
                            className={classes.chip}
                            color={data.color}
                        />
                    );
                })}
            </Paper>
        );
    }
}

ChipsArray.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return ({
        standards: state.standard.standards,
    })
}

const reduxChipsArray = connect(mapStateToProps)(ChipsArray)

export default withStyles(styles)(reduxChipsArray);