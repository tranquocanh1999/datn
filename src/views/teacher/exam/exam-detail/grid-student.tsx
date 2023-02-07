/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Grid from "../../../../components/grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import { getStudentList } from "../../../../features/competitionSlice";
import style from "./exam-detail.module.scss";
import { Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

const StudentGrid: React.FC<{ id: string }> = (props): JSX.Element => {
  const columns = [
    {
      field: "fullName",
      headerName: "Tên học sinh",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Tình trạng",
      width: 200,
      renderCell(params: any) {
        return (
          <div
            className={
              params.row.status === null
                ? style.todo
                : params.row.status === "0"
                ? style.in_progress
                : style.done
            }
          >
            {params.row.status === null
              ? "Chưa làm bài"
              : params.row.status === "0"
              ? "Đang làm bài"
              : "Đã nộp bài"}
          </div>
        );
      },
    },
    {
      field: "degree",
      headerName: "Điểm số",
      width: 200,
    },
  ];
  const data = useSelector((state: RootState) => state?.competition?.students);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getStudentList(props.id));
  }, []);

  return (
    <>
      <Button
        sx={{ marginBottom: "8px", marginLeft: "auto" }}
        onClick={() => {
          dispatch<any>(getStudentList(props.id));
        }}
        variant="contained"
      >
        <ReplayIcon />
      </Button>
      <Grid
        columns={columns}
        data={data || []}
        sxBox={{ height: "calc(100vh - 200px)", width: "100%" }}
        action={{ edit: false, delete: false }}
        message=""
        initialState={{}}
        total={0}
      />
    </>
  );
};
export default StudentGrid;
