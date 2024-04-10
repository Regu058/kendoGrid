import React, { useState } from "react";
import * as ReactDOM from 'react-dom';
import {
  Grid, GridColumn as Column ,
  GridColumnMenuSort,
  GridColumnMenuFilter,
} from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { Modal } from 'react-bootstrap';
import './styles.css';

import GridColumnMenu from "./GridColumnMenu";
import { ColumnMenuCheckboxFilter } from "./GridColumnMenu";

import products from "./products.json";
const createDataState = (dataState) => {
  return {
    result: process(products.slice(0), dataState),
    dataState: dataState,
  };
};

const App = () => {
  let initialState = createDataState({
    take: 8,
    skip: 0,
  });
  const [show, setShow] = React.useState(false);
  const columnDefs = [
    {
      title: "ID",
      field: "id",
      show: true,
      width: "150px",
    },
    {
      title: "Name",
      field: "name",
      show: true,
      width: "200px",
    },
    {
      title: "Modifier",
      field: "created_user_name",
      show: true,
      width: "200px",
    },
    {
      title: "Last Saved",
      field: "product_status_name",
      show: true,
      cell: true,
      width: "200px",
    },
  ];
  const [columnsApi, setColumnsApi] = useState(columnDefs);
  const onSelectUserColumnSubmit = (data) => {
    setColumnsApi(data);
  };

  const [result, setResult] = React.useState(initialState.result);
  const [dataState, setDataState] = React.useState(initialState.dataState);

  const dataStateChange = (event) => {
    let updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };
  return (
    <>
      <button onClick={() => setShow(true)}>Open Modal</button>
      <Modal
        size="xl"
        show={show}
        dialogClassName="viewModal"
        onHide={() => setShow(false)}
        className="my-auto"
        enforceFocus={false}
      >
        <Modal.Header>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setShow(false)}
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <Grid
        data={result}
        {...dataState}
        onDataStateChange={dataStateChange}
        sortable={true}
        pageable={true}
        pageSize={8}
      >
        {columnsApi &&
          columnsApi.map((column) => (
            <Column
              key={column.field}
              field={column.field}
              title={column.title}
              minResizableWidth={150}
              width={column.width}
              orderIndex={column.orderIndex}
              columnMenu={(props) => (
                <GridColumnMenu
                  {...props}
                  columns={columnsApi}
                  onColumnsSubmit={onSelectUserColumnSubmit}
                  showColumnMenuSort
                  showColumnMenuFilter
                  typeOfdata="columnsApi"
                />
              )}
            />
          ))}
        <Column
          field="item_type_name"
          title="Item Type"
          columnMenu={ColumnMenuCheckboxFilter}
        />
      </Grid>
        </Modal.Body>
      </Modal>
    </>
  );
};
ReactDOM.render(<App />, document.querySelector('my-app'));
