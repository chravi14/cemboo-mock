import React from "react";
import MaterialTable from "material-table";

const CustomTable = ({ data, columns }) => {
  return <MaterialTable data={data} columns={columns} />;
};

export default CustomTable;
