import React, { Component } from 'react';
import { connect } from 'react-redux';

class GradeAssignmentListItem extends Component {


    render() {


            let scoresMapArray = this.props.scores.map((score, index) => {
                if (score.student_id === this.props.student.student_id) {
                    return (
                        <tr key={index}>
                            <td>{score.standard_name}</td>
                            <td>
                                <form onChange={(event) => { this.props.editScore(event.target.value, score.id) }}>
                                    <input type="radio" name="score" value="0" defaultChecked={score.score === 0} />0
                                    <input type="radio" name="score" value="1" defaultChecked={score.score === 1} />1
                                    <input type="radio" name="score" value="2" defaultChecked={score.score === 2} />2
                                    <input type="radio" name="score" value="3" defaultChecked={score.score === 3} />3
                                    <input type="radio" name="score" value="4" defaultChecked={score.score === 4} />4
                                </form>
                            </td>
                        </tr>
                    )
                }

                else { return null }
            });

        console.log(this.props);


        return (
            <tr>
                <td>{this.props.student.student_name}</td>
                <td>
                    <table>
                        <tbody>
                            {scoresMapArray}
                        </tbody>
                    </table>
                </td>


            </tr>
        )

    }
}

const mapStateToProps = state => ({
    scores: state.score.assignmentScores,
});

export default connect(mapStateToProps)(GradeAssignmentListItem);