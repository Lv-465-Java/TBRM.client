import React, {Component} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Link} from "react-router-dom";

const linkStyle = {
    textDecoration: 'none'
}

class resourceRecordItem extends Component {

    state = {
        // id: this.props.item.id,
        // name: this.props.item.name,
        // description: this.props.item.description,
        // userId: this.props.item.userId,
        // parameters: this.props.item.parameters,

        headers: this.props.headers
    };


    render() {
        // this.appendSth();
        // let appendSth = (parameters) => {
        //     for (let value of Object.values(parameters)) {
        //         (<><TableCell align="right">${value}</TableCell></>)
        //     }
        // };
        // let list = this.state.parameters.map((parameter) => {
        //     return (<TableCell  align="right">${parameter}</TableCell>)
        // });
        // let data = {};
        //
        // this.props.he
        // data{name, description} = this.props.item
        console.log(this.props.item)
        let data = {}
        data['description'] = this.props.item['description']
        data['name'] = this.props.item['name']
        // this.props.headers.map(element => {
        //
        //     if (element.columnName === 'name'){
        //         data['name'] = this.props.item['name']
        //     } else if (element.columnName === 'description'){
        //         data['description'] = this.props.item['description']
        //     } else if( typeof(element.columnName) === "object"){
        //         data[element.columnName] = this.props.item['parameters'][element.columnName]
        //
        //     } else {
        //         data[element.columnName]=this.props.item['parameters'][element.columnName]
        //     }
        //
        //
        // })

        Object.keys(this.props.item['parameters']).forEach(key => {
            data[key] = this.props.item['parameters'][key]
        })
        return (
            <>

                    <TableRow component={Link}
                              to={`/resource/view/${this.props.tableName}/${this.props.item['id']}`}
                              style={linkStyle}>
                        {/*<Link to={`/resource/view/${tableName}/${this.state.id}`}>*/}
                        {this.props.headers.map((element, index) =>
                            <TableCell key={index} align="right">{data[element.columnName]}
                            </TableCell>)}
                        {/*</Link>*/}
                    </TableRow>
                {/*</Link>*/}
                </>
                );
                }
                }

                export default resourceRecordItem;