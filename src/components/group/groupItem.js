import React, {Component} from "react";
import axios from "../../utils/axios";

class GroupItem extends Component {
    state = {
        id: this.props.id,
        name: this.props.match.params.name,
        description: this.props.description,
        users: this.props.users
    };

    getData = () => {
        axios.get(`group/${this.state.name}`).then(response => {
            let data = response.data;
            this.setState({
                name: data.name,
                description: data.description,
                users: data.users,
            })
        })
    };

    componentDidMount() {
        this.getData();
    }


    render() {
        return(
            <div>
                <h1>{this.state.name}</h1>
                <p>{this.state.description}</p>
            </div>
        );
    }
}

export default GroupItem;