import React, { Component } from 'react';
import { connect } from 'react-redux';

import {SCORE_ACTIONS} from '../../redux/actions/scoreActions';

class GradeAssignmentListItem extends Component {

    editScore = (event) => {
        this.props.dispatch({
            type: SCORE_ACTIONS.EDIT_SCORE,
            payload: {
                scoreId: this.props.score.id,
                newScore: parseInt(event.target.value),
            },
        });
    }


    render() {

        let scoreRadioButtons =
            <form onChange={this.editScore}>
                <input type="radio" name="score" value="0" defaultChecked={this.props.score.score === 0} />0
                <input type="radio" name="score" value="1" defaultChecked={this.props.score.score === 1} />1
                <input type="radio" name="score" value="2" defaultChecked={this.props.score.score === 2} />2
                <input type="radio" name="score" value="3" defaultChecked={this.props.score.score === 3} />3
                <input type="radio" name="score" value="4" defaultChecked={this.props.score.score === 4} />4
            </form>

        return (
            <tr>
                <td>{this.props.score.student_name}</td>
                <td>{this.props.score.standard_name}</td>
                <td>{scoreRadioButtons}</td>
            </tr>
        )
    }

}

export default connect()(GradeAssignmentListItem);