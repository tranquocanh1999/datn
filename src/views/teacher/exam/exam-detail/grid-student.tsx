/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import {
  getDataDegree,
  getStudentList,
} from "../../../../features/competitionSlice";
import style from "./exam-detail.module.scss";
import { Button, ButtonProps, createSvgIcon } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import getTableColumn from "./Colums";
import {
  DataGrid,
  GridCsvExportOptions,
  GridToolbarContainer,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Chart } from "./chart";

const StudentGrid: React.FC<{
  id: string;
  totalQuestion: number;
  title: string;
}> = (props): JSX.Element => {
  const { id, totalQuestion, title } = props;

  const data: any =
    useSelector((state: RootState) => state?.competition?.students) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getStudentList(id));
    dispatch<any>(getDataDegree(id));
  }, []);

  const Footer = () => {
    return <div></div>;
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    const handleExport = (options: GridCsvExportOptions) =>
      apiRef.current.exportDataAsCsv(options);

    const ExportIcon = createSvgIcon(
      <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
      "SaveAlt"
    );

    const buttonBaseProps: ButtonProps = {
      color: "primary",
      size: "small",
      sx: {
        textTransform: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "32px",
        padding: "0 8px",
        minWidth: "12px",
        marginRight: "8px",
      },
    };

    return (
      <GridToolbarContainer>
        <Button
          {...buttonBaseProps}
          onClick={() =>
            handleExport({
              fileName: title,
              utf8WithBom: true,
            })
          }
          variant="outlined"
        >
          <ExportIcon />
        </Button>

        <Button
          {...buttonBaseProps}
          onClick={() => {
            dispatch<any>(getStudentList(id));
            dispatch<any>(getDataDegree(id));
          }}
          variant="outlined"
        >
          <ReplayIcon />
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Chart />
      <DataGrid
        columns={getTableColumn(style, totalQuestion)}
        rows={data}
        sx={{ height: "calc(100vh - 200px)", width: "100%" }}
        paginationMode="server"
        components={{
          Footer: Footer,
          Toolbar: CustomToolbar,
        }}
      />
    </>
  );
};
export default StudentGrid;
