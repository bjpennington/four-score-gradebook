import React, {Component} from 'react';

class AddStudent extends Component {
    render() {
        return (
            <table>
            <thead>
                <tr>
                    <th>Students</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>BJ Pennington</td>
                    <td><button>Delete</button></td>
                </tr>
                <tr>
                    <td>De'Anthony Miller</td>
                    <td><button>Delete</button></td>
                </tr>
                <tr>
                    <td>Peter Johnson</td>
                    <td><button>Delete</button></td>
                </tr>
                <tr>
                    <td>Tyler Sehr</td>
                    <td><button>Delete</button></td>
                </tr>
                <tr>
                    <td>Dane Smith</td>
                    <td><button>Delete</button></td>
                </tr>
            </tbody>
        </table>
        )
    }
}

export default AddStudent;                  