import { useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { StyledDatePicker } from "./DateSelector.styled";
import { subYears } from "../../shared/utils";

export const DateSelector = ({ ...props }) => {
  const [field, , { setValue }] = useField(props);

  return (
    <StyledDatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setValue(val);
      }}
      dateFormat="dd/MM/yyyy"
      maxDate={subYears(new Date(), 16)}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  );
};
