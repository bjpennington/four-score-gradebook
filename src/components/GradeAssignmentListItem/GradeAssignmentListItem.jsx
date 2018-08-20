import React, { Component } from 'react';
import {connect} from 'react-redux';

import {SCORE_ACTIONS} from '../../redux/actions/scoreActions';

class GradeAssignmentListItem extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: SCORE_ACTIONS.FETCH_ASSIGNMENT_SCORES,
            payload: this.props.assignment_id,
        })
    }
    render() {
        return (
            <tr>
                <td>BJ Pennington</td>
                <td>Recognize Design Flaws <br />Use Appropriate Safety <br />Measure and Calculate Speed</td>
                <td>1 2 3 4 <br /> 1 2 3 4 <br /> 1 2 3 4</td>
            </tr>
        )
    }

}

const mapStateToProps = (state) => {
    return({
        scores: state.score.scores,
    });
}

export default connect(mapStateToProps)(GradeAssignmentListItem);