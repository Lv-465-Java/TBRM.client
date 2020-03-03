import React, {Component} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class resourceRecordItem extends Component {

    state = {
        // id: this.props.item.id,
        // name: this.props.item.name,
        // description: this.props.item.description,
        // userId: this.props.item.userId,
        // parameters: this.props.item.parameters,

        headers: this.props.headers
    };

    // appendParameters = () => {
    //     for (let value of this.state.parameters) {
    //         console.log(value);
    //     }
    // };


// Iterate over the property names:
//     appendSth = () => {
//         for (let value of Object.entries(this.state.parameters)) {
//             console.log(value);
//         }
//     }
//     appendSth = () => {
//         for (let value of Object.values(this.state.parameters)) {
//             (`<TableCell align="right">${value}</TableCell>`)
//         }
//     };


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
            data[key]=this.props.item['parameters'][key]
        })

        return (
            <>
                <TableRow>
                    {this.props.headers.map((element, index)=> <TableCell key={index} align="right">{data[element.columnName]}</TableCell>)}
                    {/*<TableCell align="right">{this.state.name}</TableCell>*/}
                    {/*{list}*/}
                {/*    {*/}
                {/*    this.state.parameters.map((value) => {*/}
                {/*        return (<TableCell  align="right">${value}</TableCell>)*/}
                {/*    })*/}
                {/*}*/}

                    {/*{*/}
                    {/*    this.state.obj.map((value) => {*/}
                    {/*    return(<TableCell align="right">{value}</TableCell>)*/}
                    {/*})*/}
                    {/*}*/}


                    {/*{*/}
                    {/*    this.state.parameters.map(element => {*/}
                    {/*    return(<TableCell align="right">${element.value}</TableCell>)*/}
                    {/*    })*/}
                    {/*}*/}
                    {/*<TableCell align="right">{this.appendParameters()}</TableCell>*/}
                    {/*<TableCell align="right">{this.state.parameters.map(value => )}</TableCell>*/}

                    {/*<TableCell align="right">{this.state.parameters}</TableCell>*/}

                    {/*    <Tooltip title="Delete">*/}
                    {/*        <IconButton aria-label="delete" onClick={this.delete}>*/}
                    {/*           <DeleteIcon/>*/}
                    {/*        </IconButton>*/}
                    {/*    </Tooltip>*/}
                    {/*    <Tooltip title="Edit">*/}
                    {/*        <IconButton aria-label="edit">*/}
                    {/*            <EditIcon/>*/}
                    {/*        </IconButton>*/}
                    {/*    </Tooltip>*/}
                    {/*<CreateParameter getData={this.getData}*/}
                    {/*                 resTempId={this.state.resTempId}/>*/}
                    {/*{element}*/}

                </TableRow>
            </>
        );
    }
}

export default resourceRecordItem;