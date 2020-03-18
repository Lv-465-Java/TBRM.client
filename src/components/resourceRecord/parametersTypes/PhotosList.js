import React, {Component} from 'react';
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";

// class PhotosList extends Component {
//     state={
//         activeStep: 0
//
//     }
//
//     handleNext = () => {
//         var next= this.state.activeStep+1;
//         this.setState({activeStep: next});
//     };
//
//     handleBack = () => {
//         var next = this.state.activeStep - 1;
//         this.setState({activeStep: next});
//     }
//     render() {
        // return (
        //     <div>
        //         <img src={item} style={{
        //             maxWidth: 400,
        //             maxHigh: 300,
        //             alignItems: "center"
        //         }} alt={"image"}/>
        //         <MobileStepper steps={3
        //             // this.state.photos.substring(0, this.state.photos.length - 1)
        //             // .split(",").count()
        //         }
        //                        position={"static"}
        //                        variant={"text"}
        //                        activeStep={this.state.activeStep}
        //                        nextButton={
        //                            <Button size="small" onClick={this.handleNext}
        //                                // disabled={activeStep === number- 1}
        //                            >
        //                                Next
        //                            </Button>
        //                        }
        //                        backButton={
        //                            <Button size="small" onClick={this.handleBack}
        //                                    disabled={this.state.activeStep === 0}
        //                            >
        //                                Back
        //                            </Button>
        //                        }
        //         />
//             </div>
//         )
//     }
// }
//
// export default PhotosList;