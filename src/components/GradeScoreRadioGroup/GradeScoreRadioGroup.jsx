import React, { Component } from 'react';

import { RadioGroup, FormControlLabel, Radio, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        display: 'flex',
    },
    table: {
        minWidth: 300,
        maxWidth: 900,
    },
    tableCell: {
        fontSize: '50px',
    },
    button: {
        margin: 5,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        flexDirection: 'row'
    },
    radioButton: {
        marginRight: 5,
        marginLeft: 5,
    }
})

class GradeScoreRadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.score.score.toString()
        }
    }

    updateRadioButton = (event) => {
        this.setState({
            checked: event.target.value,
        });
        this.props.editScore(event.target.value, this.props.score.id);
    }

    render() {
        return (
            <FormControl>
                <RadioGroup value={this.state.checked} className={this.props.classes.group} name="score" onChange={this.updateRadioButton}>
                    <FormControlLabel className={this.props.classes.radioButton} control={<Radio />} label="0" value="0" />
                    <FormControlLabel className={this.props.classes.radioButton} control={<Radio />} label="1" value="1" />
                    <FormControlLabel className={this.props.classes.radioButton} control={<Radio />} label="2" value="2" />
                    <FormControlLabel className={this.props.classes.radioButton} control={<Radio />} label="3" value="3" />
                    <FormControlLabel className={this.props.classes.radioButton} control={<Radio />} label="4" value="4" />
                </RadioGroup>
            </FormControl>
        )
    }
}

export default withStyles(styles)(GradeScoreRadioGroup);