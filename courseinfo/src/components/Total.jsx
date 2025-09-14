const Total = ({ parts }) => {
  const totals = parts.reduce((prev, cur) => prev + cur.exercises, 0);

  return <strong>total of {totals} exercises</strong>;
};

export default Total;
