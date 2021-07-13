import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

const CalendarDob = ({ dob, setDob }) => {
  return (
    <DatePicker
      locale={ko}
      dateFormat="yyyy,MM,dd"
      maxDate={new Date()}
      selected={dob}
      placeholderText="생년월일"
      onChange={(date) => setDob(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
}
export default CalendarDob;