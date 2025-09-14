import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = (value) => {
    setFeedback({
      ...feedback,
      [value]: feedback[value] + 1,
    });
  };

  const allFeedbackCount = () => {
    return feedback.bad + feedback.good + feedback.neutral;
  };

  const average = () => {
    const { good, bad } = feedback;

    return (good - bad) / allFeedbackCount() || 0;
  };

  const positive = () =>
    ((feedback.good / allFeedbackCount()) * 100 || 0) + "%";

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={() => handleClick("good")} text="good" />
      <Button onClick={() => handleClick("neutral")} text="neutral" />
      <Button onClick={() => handleClick("bad")} text="bad" />
      <h2>statistics</h2>
      {feedback.good || feedback.neutral || feedback.bad ? (
        <table>
          <tbody>
            <Statistics text="good" value={feedback.good} />
            <Statistics text="neutral" value={feedback.neutral} />
            <Statistics text="bad" value={feedback.bad} />
            <Statistics text="all" value={allFeedbackCount()} />
            <Statistics text="average" value={average()} />
            <Statistics text="positive" value={positive()} />
          </tbody>
        </table>
      ) : (
        "No feedback given"
      )}
    </>
  );
}

export default App;
