const Form = ({
  nameValue,
  onChangeName,
  numberValue,
  onChangeNumber,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onChangeName} />
      </div>
      <div>
        number <input value={numberValue} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default Form;
