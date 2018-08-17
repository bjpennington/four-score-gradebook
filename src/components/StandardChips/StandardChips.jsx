import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

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

    chipsArray = this.props.standards.map((standard, index) => {
        return {
            standard_name: standard.standard_name,
            id: standard.id,
            color: "default",
            colorDefault: true,
        }
    });
    
    state = {
        chipData: this.chipsArray,
        colorDefault: true,
        color: "primary",
    };



    handleDelete = data => () => {
        if (data.label === 'React') {
            alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
            return;
        }

        this.setState(state => {
            const chipData = [...state.chipData];
            const chipToDelete = chipData.indexOf(data);
            chipData.splice(chipToDelete, 1);
            return { chipData };
        });
    };

   

    handleClick = (data) => {
        console.log(data)
        let chipColor = "default"
        if(data.colorDefault) {
            chipColor = "primary"
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
                            onClick={this.handleClick.bind(this, data)}
                            className={classes.chip}
                            color={this.chipColor}
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