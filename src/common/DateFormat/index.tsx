import React from "react";
import { format } from "date-fns";

interface Props {
  date: any;
}

const DateFormat: React.FC<Props> = ({ date }) => {
  const formattedDate = format(new Date(date), "dd/MM/yyyy HH:mm:ss");
  return <span>{formattedDate}</span>;
};

export default DateFormat;
