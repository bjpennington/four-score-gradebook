import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TableRow, TableCell, Collapse } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import GradeScoreRadioGroup from '../GradeScoreRadioGroup/GradeScoreRadioGroup';

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
})

class GradeAssignmentListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowCollapsed: false,
        }
    }

    toggleCollapse = () => {
        this.setState({
            rowCollapsed: !this.state.rowCollapsed,
        });
    }


    render() {


        let scoresMapArray = this.props.scores.map((score, index) => {
            if (score.student_id === this.props.student.student_id) {
                return (
                    <tr key={index}>
                        <td>{score.standard_name}</td>
                        <td>
                            <GradeScoreRadioGroup score={score} editScore={this.props.editScore} />
                        </td>
                    </tr>
                )
            }

            else { return null }
        });


        return (

            <TableRow>
                <TableCell onClick={this.toggleCollapse}>{this.props.student.student_name}</TableCell>
                <TableCell>
                    <Collapse in={this.state.rowCollapsed}>

                        <table>
                            <tbody>
                                {scoresMapArray}
                            </tbody>
                        </table>
                    </Collapse>

                </TableCell>
            </TableRow>

        )

    }
}

const mapStateToProps = state => ({
    scores: state.score.assignmentScores,
});

const connnectedGradeAssignmentListItem = connect(mapStateToProps)(GradeAssignmentListItem);
export default withStyles(styles)(connnectedGradeAssignmentListItem);