import React from "react";

import Section from "./Section";
import Question from "../Question";

import OutputTable from "../Database/Output";

import Feedback from "../Feedback";

import checkAnswer from "../Question/answer";

import { saveProgress } from "../Group/API";

import buildQuestions from "../../questions/utils/buildQuestions";
import saveQuestions from "../../questions/utils/saveQuestions";

import InputForm from "../Database/Input";

import { withStyles } from "@material-ui/core/styles";
let userData = "";
const styles = (theme) => ({
  containerStyle: {
    flexGrow: 1,
    height: "100%",
    flexDirection: "column",
    display: "flex",
    overflow: "auto",
  },
  innerContainerStyle: {
    overflow: "auto",
  },
  // Necessary for content to be below app bar.
  toolbar: theme.mixins.toolbar,
});

class Main extends React.Component {
  state = {
    feedback: null,

    allQuestions: null,
    activeQuestionIndex: 0,
  };

  changeFeedback = (feedback) =>
    this.setState({
      feedback: { ...feedback, timestamp: new Date().getTime() },
    });

  componentDidMount() {
    userData = JSON.parse(localStorage.getItem("user"));
    this.getQuestions();
  }

  getQuestions = async () => {
    let allQuestions;

    // const { user } = this.props;

    const group = (userData && userData.group) || null;

    // Has the group already have generated questions.
    // Joining a group SHOULD remove all questions so they are rebuilt with the new group database.
    if (group && group.questions && group.questions.length > 0) {
      //console.log("Used group questions");
      allQuestions = group.questions;
    } else {
      // Check the localStorage for any cached question sets
      const cachedQuestions = localStorage.getItem("__testSQL_Questions__");

      if (cachedQuestions && !group) {
        //console.log("Used cached questions");
        // Cached questions, and the user is not in a group.
        allQuestions = JSON.parse(cachedQuestions);
      } else {
        //console.log("Built new questions");
        // Cached questions, but the user is in a group that doesn't have questions.
        // Rebuild the questions for this group.
        allQuestions = await buildQuestions(this.props.currentDatabase);

        // No group, no cache, so the questions got built, now save them locally.
        saveQuestions(allQuestions);
      }

      // If the user has no saved questions, then send all the generated questions up to the server.
      // If the user is in a group. Save the progress.
      if (group) {
        saveProgress(allQuestions);
      }
    }

    return this.setState({ allQuestions });
  };

  componentDidUpdate(prevProps) {
    // Update the questions if:
    // - The user is logged in, and they left a group;
    // - The database has changed.
    const hasLeftGroup =
      this.props.user &&
      prevProps.user &&
      Boolean(!this.props.user.group) &&
      prevProps.user.group;

    const hasDatabaseChanged =
      prevProps.currentDatabase &&
      prevProps.currentDatabase.filename !==
        this.props.currentDatabase.filename;

    if (hasLeftGroup || hasDatabaseChanged) {
      this.getQuestions();
    }
  }

  changeQuestion = (index) => this.setState({ activeQuestionIndex: index });

  runQuery = async (sql) => {
    console.log(this.props);
    // const { currentDatabase, loadDatabase } = this.props;

    const { activeQuestionIndex, allQuestions } = this.state;

    let results = [];

    try {
      const output = this.props.currentDatabase.exec(sql);
      console.log(output);

      // Check if any database actions were ran, if so only update the database.
      if (this.props.currentDatabase.getRowsModified()) {
        // TODO: Make this function name a saveDatabase()...
        this.props.loadDatabase(this.props.currentDatabase);
      } else {
        results = output;
      }

      if (
        checkAnswer(
          this.props.currentDatabase,
          sql,
          allQuestions[activeQuestionIndex]
        )
      ) {
        const updatedAllQuestions = await this.completeCurrentQuestion(sql);
        console.log(this.props.user, this.props.user.group);
        // Only save progress if in a group.
        if (userData && userData.group) {
          saveProgress(updatedAllQuestions);
        } else {
          saveQuestions(updatedAllQuestions, this.props.user);
        }
      }
    } catch (Error) {
      this.changeFeedback({ message: Error.message, variant: "error" });
    }

    // Update the results array in the Container component.
    this.props.updateResultsHandler(results);
  };

  completeCurrentQuestion = (sql) => {
    const { activeQuestionIndex, allQuestions } = this.state;

    this.changeFeedback({ message: "Correct Answer", variant: "success" });

    const activeQuestion = allQuestions[activeQuestionIndex];

    // Create a copy of the original question set and update the completed flag of the active question.
    // Immutable \o/.
    const updatedAllQuestions = allQuestions.map((question) => {
      if (Object.is(question, activeQuestion)) {
        return { ...question, completed: true };
      }

      return question;
    });

    this.setState({
      allQuestions: updatedAllQuestions,
    });

    return updatedAllQuestions;
  };

  render() {
    const { allQuestions, activeQuestionIndex, feedback } = this.state;

    // const { results, classes } = this.props;

    return (
      <main className={this.props.classes.containerStyle}>
        <div className={this.props.classes.toolbar} />
        <div className={this.props.classes.innerContainerStyle}>
          <Section title="Questions">
            {allQuestions && (
              <Question
                activeQuestionIndex={activeQuestionIndex}
                allQuestions={allQuestions}
                changeQuestionHandler={this.changeQuestion}
              />
            )}
          </Section>

          <Section title="Statement" padding="16px">
            <InputForm submitHandler={this.runQuery} />
          </Section>

          {this.props.results.map((result, i) => (
            <Section title="Results" key={i} padding="16px">
              <OutputTable columns={result.columns} values={result.values} />
            </Section>
          ))}
          <Feedback {...feedback} changeHandler={this.changeFeedback} />
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(Main);
