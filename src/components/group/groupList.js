import React, {Component} from "react";
import axios from '../../utils/axios';
import {Button, Grid} from '@material-ui/core';

class GroupList extends Component {
    state = {
        groups: []
    }

    getData = () => {
        axios.get("/group").then(response => {
            let groups = response.data;
            this.setState({groups});
        })
    }

    componentDidMount() {
        this.getData();
    }

    goToCreateGroup = () => {
        this.props.history.push("/group/create");
    }

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.goToCreateGroup}>Create Group</Button>
            </div>
        )
    }
}

export default GroupList;