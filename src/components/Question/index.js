// import React, { useEffect, useState } from "react";

// import { marked } from "marked";

// import { withStyles } from "@material-ui/core/styles";

// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepButton from "@material-ui/core/StepButton";
// import StepLabel from "@material-ui/core/StepLabel";

// import Typography from "@material-ui/core/Typography";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// import Divider from "@material-ui/core/Divider";

// import Button from "@material-ui/core/Button";

// import MenuItem from "@material-ui/core/MenuItem";

// import Select from "@material-ui/core/Select";
// import Hidden from "@material-ui/core/Hidden";
// import { ConstructionOutlined } from "@mui/icons-material";

// const styles = (theme) => ({
//   innerPadding: {
//     padding: theme.spacing(2),
//     overflow: "auto",
//   },
//   stepperButton: {
//     padding: theme.spacing(1),
//     margin: -theme.spacing(1),
//   },
//   stepperLabel: {
//     padding: 0,
//   },
//   completedStep: {
//     color: "green !important",
//   },
//   divider: {
//     marginBottom: theme.spacing(2),
//   },
//   previousButton: {
//     marginRight: theme.spacing(1),
//   },
//   SkipButton: {
//     marginRight: theme.spacing(1),
//   },
//   bottomActions: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: theme.spacing(2),
//   },
// });

// function QuestionManager(props) {
//   // state = {
//   //   allSetNames: [],
//   //   activeSet: null,
//   //   activeQuestionSet: null,
//   //   countNext: 0,
//   //   countPrev: 0,
//   // };
//   const [allSetNames, setAllSetNames] = useState([]);
//   const [activeSet, setactiveSet] = useState(null);
//   const [activeQuestionSet, setActiveQuestionSet] = useState(null);
//   const [countNext, setCountNext] = useState(0);
//   const [countPrev, setCountPrev] = useState(0);
//   useEffect(() => {
//     const { allQuestions } = props;

//     const allSetNames = [
//       ...new Set(allQuestions.map((question) => question.set)),
//     ];

//     const activeSet = allSetNames[0];

//     // Only get the questions in this set.
//     const activeQuestionSet = [
//       ...allQuestions.filter((question) => question.set === activeSet),
//     ];
//     const countPrev = 0;
//     setAllSetNames(allSetNames);
//     setactiveSet(activeSet);
//     setActiveQuestionSet(activeQuestionSet);
//     setCountPrev(countPrev);
//   }, []);
//   const handleNext = () => {
//     const activeQuestionIndex =
//       props.allQuestions[props.activeQuestionIndex].index;
//     console.log("active index", activeQuestionIndex);
//     console.log("total data", activeQuestionSet.length);

//     const next = activeQuestionIndex + 1;
//     console.log("current value", next);
//     // % this.state.activeQuestionSet.length;.
//     // Translate the prev index of the active set to allQuestions.
//     const allQuestionsIndex = next;
//     // this.state.activeQuestionSet[next].index;
//     console.log(activeQuestionSet[activeQuestionIndex]?.completed);
//     console.log("final index", allQuestionsIndex);
//     props.changeQuestionHandler(allQuestionsIndex);
//     setCountNext(countNext + 1);
//     setCountPrev(countPrev + 1);
//   };

//   const handlePrev = () => {
//     const activeQuestionIndex =
//       props.allQuestions[props.activeQuestionIndex].index;

//     const prevIndex = activeQuestionIndex - 1;

//     // Check for underflow.
//     const prev = prevIndex < 0 ? activeQuestionSet.length - 1 : prevIndex;

//     // Translate the prev index of the active set to allQuestions.
//     const allQuestionsIndex = prevIndex;
//     //  this.state.activeQuestionSet[prev].index;

//     props.changeQuestionHandler(allQuestionsIndex);
//     setCountNext(countNext - 1);
//     setCountPrev(countPrev - 1);
//   };

//   const handleQuestionChange = (index) => () => {
//     props.changeQuestionHandler(index);
//   };

//   const handleSetChange = (event) => {
//     const set = event.target.value;
//     console.log(set);
//     // Don't do anything if nothing has changed.
//     if (set === props.activeSet) return;

//     const { allQuestions } = props;

//     // Extract only the questions in this set.
//     const activeQuestionSet = [
//       ...allQuestions.filter((question) => question.set === set),
//     ];
//     console.log(activeQuestionSet);
//     // Set doesn't exist...
//     if (activeQuestionSet.length === 0) return;

//     // Set the active question to the first in the set.
//     props.changeQuestionHandler(activeQuestionSet[0].index);

//     const activeSet = set;
//     const countNext = 0;
//     const countPrev = 0;
//     console.log(activeSet);
//     setActiveQuestionSet(activeQuestionSet);
//     setactiveSet(activeSet);
//     setCountPrev(countPrev);
//     setCountNext(countNext);
//   };

//   // render() {
//   // const { activeQuestionSet, allSetNames, activeSet } = this.state;

//   // Wait until we have the sets divided.
//   if (!activeSet) {
//     return <div>Dividing the questions by their sets.</div>;
//   }

//   const { classes, allQuestions, activeQuestionIndex } = props;

//   const activeQuestion = allQuestions[activeQuestionIndex];

//   const activeStep = activeQuestionSet.indexOf(activeQuestion);
//   console.log("active", activeStep);

//   return (
//     <React.Fragment>
//       {activeQuestionSet && (
//         <Stepper
//           activeStep={activeStep}
//           className={classes.innerPadding}
//           nonLinear
//         >
//           {activeQuestionSet.map((question) => (
//             <Step key={question.index}>
//               <StepButton
//                 className={classes.stepperButton}
//                 aria-label={`Question #${question.index}`}
//                 onClick={handleQuestionChange(question.index)}
//                 completed={Boolean(question.completed)}
//               >
//                 <StepLabel
//                   classes={{
//                     iconContainer: classes.stepperLabel,
//                   }}
//                   StepIconProps={{
//                     classes: {
//                       active: classes.activeStep,
//                       completed: classes.completedStep,
//                     },
//                   }}
//                   error={Boolean(question.error)}
//                 />
//               </StepButton>
//             </Step>
//           ))}
//         </Stepper>
//       )}
//       <Divider />
//       <div className={classes.innerPadding}>
//         {activeQuestion && (
//           <Typography
//             variant="subtitle1"
//             component="div"
//             color={activeQuestion.error ? "error" : "inherit"}
//             dangerouslySetInnerHTML={{
//               __html: marked(activeQuestion.question),
//             }}
//             gutterBottom
//           />
//         )}
//         <div className={classes.bottomActions}>
//           {activeSet && (
//             <div>
//               <Select value={activeSet} onChange={handleSetChange}>
//                 {allSetNames.map((name) => (
//                   <MenuItem key={name} value={name}>
//                     {name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </div>
//           )}
//           <div>
//             {console.log("countPrev", countPrev)}
//             <Button
//               className={classes.previousButton}
//               variant="contained"
//               size="small"
//               disabled={countPrev === 0 ? true : false}
//               aria-label="Previous question"
//               onClick={handlePrev}
//             >
//               <KeyboardArrowLeftIcon />
//               <Hidden xsDown implementation="css">
//                 Previous
//               </Hidden>
//             </Button>
//             {console.log("countnext", countNext)}
//             {console.log("totalQues", activeQuestionSet.length)}
//             <Button
//               className={classes.SkipButton}
//               variant="contained"
//               size="small"
//               color="primary"
//               aria-label="Next question"
//               onClick={handleNext}
//               disabled={
//                 countNext === activeQuestionSet.length - 1 ? true : false
//               }
//               // style={{ marginRight: "1rem" }}
//             >
//               <Hidden xsDown implementation="css">
//                 Skip
//               </Hidden>
//               <KeyboardArrowRightIcon />
//             </Button>

//             <Button
//               className={classes.nextButton}
//               variant="contained"
//               size="small"
//               color="primary"
//               aria-label="Next question"
//               // disabled={
//               //   this.state.countNext ===
//               //   this.state.activeQuestionSet.length - 1
//               //     ? true
//               //     : false
//               // }
//               disabled={
//                 Boolean(activeQuestionSet[activeQuestionIndex]?.completed) ===
//                 false
//                   ? true
//                   : false
//               }
//               onClick={handleNext}
//             >
//               <Hidden xsDown implementation="css">
//                 Next
//               </Hidden>
//               <KeyboardArrowRightIcon />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// export default withStyles(styles)(QuestionManager);
import React from "react";

import { marked } from "marked";

import { withStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";

import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Divider from "@material-ui/core/Divider";

import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import Hidden from "@material-ui/core/Hidden";
import { ConstructionOutlined } from "@mui/icons-material";

const styles = (theme) => ({
  innerPadding: {
    padding: theme.spacing(2),
    overflow: "auto",
  },
  stepperButton: {
    padding: theme.spacing(1),
    margin: -theme.spacing(1),
  },
  stepperLabel: {
    padding: 0,
  },
  completedStep: {
    color: "green !important",
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  previousButton: {
    marginRight: theme.spacing(1),
  },
  SkipButton: {
    marginRight: theme.spacing(1),
  },
  bottomActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
});

class QuestionManager extends React.Component {
  state = {
    allSetNames: [],
    activeSet: null,
    activeQuestionSet: null,
    countNext: 0,
    countPrev: 0,
  };

  componentDidMount() {
    const { allQuestions } = this.props;

    const allSetNames = [
      ...new Set(allQuestions.map((question) => question.set)),
    ];

    const activeSet = allSetNames[0];

    // Only get the questions in this set.
    const activeQuestionSet = [
      ...allQuestions.filter((question) => question.set === activeSet),
    ];
    const countPrev = 0;
    this.setState({
      allSetNames,
      activeSet,
      activeQuestionSet,
      countPrev,
    });
  }

  /**
   * Required to update the "active question set".
   * The props passed is the full question set.
   */

  componentDidUpdate = (prevProps) => {
    const { allQuestions, activeQuestionIndex } = this.props;

    const activeQuestion = allQuestions[activeQuestionIndex];

    if (
      activeQuestionIndex === prevProps.activeQuestionIndex &&
      activeQuestion.completed !==
        prevProps.allQuestions[activeQuestionIndex].completed
    ) {
      // Means that the component has to rebuild the active set, as we created a brand new completed question object.
      const activeQuestionSet = [
        ...allQuestions.filter(
          (question) => question.set === this.state.activeSet
        ),
      ];

      // Yes, setState is called twice; it's batched.
      this.setState({
        activeQuestionSet,
      });
    }

    if (
      this.props.allQuestions &&
      this.state.activeSet !== activeQuestion.set
    ) {
      // Or, if the set has changed, rebuild the available sets.
      // If this set doesn't exist, rebuilt the sets from the questions.
      // This signifies a new question set.
      if (this.state.allSetNames.includes(activeQuestion.set) === false) {
        const allSetNames = [
          ...new Set(allQuestions.map((question) => question.set)),
        ];

        this.setState({ allSetNames });
      }

      const activeSet = activeQuestion.set;

      // Means that the component has to rebuild the active set, as we created a brand new completed question object.
      const activeQuestionSet = [
        ...allQuestions.filter(
          (question) => question.set === this.state.activeSet
        ),
      ];

      // Yes, setState is called twice; it's batched.
      this.setState({
        activeSet,
        activeQuestionSet,
      });
    }
  };

  handleNext = () => {
    const activeQuestionIndex =
      this.props.allQuestions[this.props.activeQuestionIndex].index;
    console.log("active index", activeQuestionIndex);
    console.log("total data", this.state.activeQuestionSet.length);

    const next = activeQuestionIndex + 1;
    console.log("current value", next);
    // % this.state.activeQuestionSet.length;.
    // Translate the prev index of the active set to allQuestions.
    const allQuestionsIndex = next;
    // this.state.activeQuestionSet[next].index;

    console.log("final index", allQuestionsIndex);
    this.props.changeQuestionHandler(allQuestionsIndex);
    this.setState({
      countPrev: this.state.countPrev + 1,
      countNext: this.state.countNext + 1,
    });
  };

  handlePrev = () => {
    const activeQuestionIndex =
      this.props.allQuestions[this.props.activeQuestionIndex].index;

    const prevIndex = activeQuestionIndex - 1;

    // Check for underflow.
    const prev =
      prevIndex < 0 ? this.state.activeQuestionSet.length - 1 : prevIndex;

    // Translate the prev index of the active set to allQuestions.
    const allQuestionsIndex = prevIndex;
    //  this.state.activeQuestionSet[prev].index;

    this.props.changeQuestionHandler(allQuestionsIndex);
    this.setState({
      countPrev: this.state.countPrev - 1,
      countNext: this.state.countNext - 1,
    });
  };

  handleQuestionChange = (index) => () => {
    this.props.changeQuestionHandler(index);
  };

  handleSetChange = (event) => {
    const set = event.target.value;
    console.log(set);
    // Don't do anything if nothing has changed.
    if (set === this.state.activeSet) return;

    const { allQuestions } = this.props;

    // Extract only the questions in this set.
    const activeQuestionSet = [
      ...allQuestions.filter((question) => question.set === set),
    ];
    console.log(activeQuestionSet);
    // Set doesn't exist...
    if (activeQuestionSet.length === 0) return;

    // Set the active question to the first in the set.
    this.props.changeQuestionHandler(activeQuestionSet[0].index);

    const activeSet = set;
    const countNext = 0;
    const countPrev = 0;
    console.log(activeSet);
    this.setState({
      activeSet,
      activeQuestionSet,
      countPrev,
      countNext,
    });
  };

  render() {
    const { activeQuestionSet, allSetNames, activeSet } = this.state;

    // Wait until we have the sets divided.
    if (!activeSet) {
      return <div>Dividing the questions by their sets.</div>;
    }

    const { classes, allQuestions, activeQuestionIndex } = this.props;

    const activeQuestion = allQuestions[activeQuestionIndex];

    const activeStep = activeQuestionSet.indexOf(activeQuestion);
    console.log("active", activeStep);

    return (
      <React.Fragment>
        {activeQuestionSet && (
          <Stepper
            activeStep={activeStep}
            className={classes.innerPadding}
            nonLinear
          >
            {activeQuestionSet.map((question) => (
              <Step key={question.index}>
                <StepButton
                  className={classes.stepperButton}
                  aria-label={`Question #${question.index}`}
                  onClick={this.handleQuestionChange(question.index)}
                  completed={Boolean(question.completed)}
                >
                  <StepLabel
                    classes={{
                      iconContainer: classes.stepperLabel,
                    }}
                    StepIconProps={{
                      classes: {
                        active: classes.activeStep,
                        completed: classes.completedStep,
                      },
                    }}
                    error={Boolean(question.error)}
                  />
                </StepButton>
              </Step>
            ))}
          </Stepper>
        )}
        <Divider />
        <div className={classes.innerPadding}>
          {activeQuestion && (
            <Typography
              variant="subtitle1"
              component="div"
              color={activeQuestion.error ? "error" : "inherit"}
              dangerouslySetInnerHTML={{
                __html: marked(activeQuestion.question),
              }}
              gutterBottom
            />
          )}
          <div className={classes.bottomActions}>
            {activeSet && (
              <div>
                <Select value={activeSet} onChange={this.handleSetChange}>
                  {allSetNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
            <div>
              {console.log("countPrev", this.state.countPrev)}
              <Button
                className={classes.previousButton}
                variant="contained"
                size="small"
                disabled={this.state.countPrev === 0 ? true : false}
                aria-label="Previous question"
                onClick={this.handlePrev}
              >
                <KeyboardArrowLeftIcon />
                <Hidden xsDown implementation="css">
                  Previous
                </Hidden>
              </Button>
              {console.log("countnext", this.state.countNext)}
              {console.log("totalQues", this.state.activeQuestionSet.length)}
              <Button
                className={classes.SkipButton}
                variant="contained"
                size="small"
                color="primary"
                aria-label="Next question"
                onClick={this.handleNext}
                disabled={
                  this.state.countNext ===
                  this.state.activeQuestionSet.length - 1
                    ? true
                    : false
                }
                // style={{ marginRight: "1rem" }}
              >
                <Hidden xsDown implementation="css">
                  Skip
                </Hidden>
                <KeyboardArrowRightIcon />
              </Button>

              <Button
                className={classes.nextButton}
                variant="contained"
                size="small"
                color="primary"
                aria-label="Next question"
                // disabled={
                //   this.state.countNext ===
                //   this.state.activeQuestionSet.length - 1
                //     ? true
                //     : false
                // }
                disabled={
                  Boolean(activeQuestionSet[activeQuestionIndex]?.completed) ===
                  false
                    ? true
                    : false
                }
                onClick={this.handleNext}
              >
                <Hidden xsDown implementation="css">
                  Next
                </Hidden>
                <KeyboardArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(QuestionManager);
