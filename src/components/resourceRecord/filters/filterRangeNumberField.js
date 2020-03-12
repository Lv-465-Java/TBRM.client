import React, {Component} from 'react';
import FilterPointNumberField from "./filterPointNumberField";

class FilterRangeNumberField extends Component {

    // reset = () => {
    //     this.setState({value: ""}, () => {
    //         this.props.setFilter(this.props.columnName, this.buildFilter());
    //     });
    //     this.setState({operation: ""}, () => {
    //         this.props.setFilter(this.props.columnName, this.buildFilter());
    //     });
    // };

    render() {
        return (
            <>
                <div className={"filterCells"}>
                    <div style={{marginRight: "5px"}}>
                        {this.props.name}
                    </div>
                    <FilterPointNumberField setFilter={this.props.setFilter}
                                            name="from"
                                            columnName={`${this.props.columnName}_from`}/>

                    <FilterPointNumberField setFilter={this.props.setFilter}
                                            name="to"
                                            columnName={`${this.props.columnName}_to`}/>
                </div>
            </>
        );
    }
}

export default FilterRangeNumberField;