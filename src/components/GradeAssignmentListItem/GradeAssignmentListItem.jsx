import React, { Component } from 'react';
import { connect } from 'react-redux';

class GradeAssignmentListItem extends Component {


    render() {

        let scoreRadioButtons =
            <form onChange={(event) => {this.props.editScore(event.target.value, this.props.score.id)}}>
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