import React, { Component } from 'react';
import { connect } from 'react-redux';

class GradeAssignmentListItem extends Component {

    render() {

        let scoreRadioButtons =
            <form>
                <input type="radio" name="score" value="1" />1
                <input type="radio" name="score" value="2" />2
                <input type="radio" name="score" value="3" />3
                <input type="radio" name="score" value="4" />4
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

const mapStateToProps = (state) => {
    return ({
        scores: state.score.scores,
    });
}

export default connect(mapStateToProps)(GradeAssignmentListItem);