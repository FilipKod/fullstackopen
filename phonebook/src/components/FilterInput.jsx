const FilterInput = ({ value, onChange }) => {
  return (
    <div>
      filter by name <input value={value} onChange={onChange} />
    </div>
  );
};
export default FilterInput;
