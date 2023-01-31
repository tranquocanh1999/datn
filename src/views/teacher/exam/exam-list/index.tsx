import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import Grid from "../../../../components/grid";
import style from "./exam-list.module.scss";
import UserForm from "../exam-form";
import { examStatus } from "../../../../shared/contants/exam";

const ExamList: React.FC = (): JSX.Element => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [exam, setExam] = useState<any>();
  const columns = [
    {
      field: "code",
      headerName: "Mã đề thi",
      width: 120,
    },
    {
      field: "title",
      headerName: "Tên tiêu đề",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell(params: any) {
        return (
          <div
            className={
              params.row.status === 0
                ? style.todo
                : params.row.status === 1
                ? style.in_progress
                : style.done
            }
          >
            <div>{examStatus[params.row.status]}</div>
          </div>
        );
      },
    },
    {
      field: "class",
      headerName: "Lớp học",
      width: 200,
      sortable: false,
      renderCell(params: any) {
        return (
          <div className={style.class_info}>
            <div>{params.row.class.name}</div>
          </div>
        );
      },
    },
  ];
  const data = [
    {
      id: 1,
      code: "ST001",
      title: "Trần Quốc Anh",
      status: 0,
      class: { id: 1, code: "ABC", name: "Lớp thầy Huấn 2" },
    },
    {
      id: 2,
      code: "ST001",
      title: "Trần Quốc Anh",
      status: 1,
      class: { id: 1, code: "ABC", name: "Lớp thầy Huấn 4" },
    },
    {
      id: 3,
      code: "ST001",
      title: "Trần Quốc Anh",
      status: 2,
      class: { id: 1, code: "ABC", name: "Lớp thầy Huấn 2" },
    },
  ];
  const classes = [
    {
      id: 1,
      code: "CL001",
      name: "Lớp thầy tuấn",
      teacher_name: "Huấn hoa hồng",
      numberOfStudent: 35,
      description: "đây là mô tả",
    },
    {
      id: 2,
      code: "CL001",
      name: "Lớp thầy tuấn",
      teacher_name: "Huấn hoa hồng",
      numberOfStudent: 35,
      description: "đây là mô tả",
    },
    {
      id: 3,
      code: "CL001",
      name: "Lớp thầy tuấn",
      teacher_name: "Huấn hoa hồng",
      numberOfStudent: 35,
      description: "đây là mô tả",
    },
    {
      id: 4,
      code: "CL001",
      name: "Lớp thầy tuấn",
      teacher_name: "Huấn hoa hồng",
      numberOfStudent: 35,
      description: "đây là mô tả",
    },
  ];
  return (
    <div>
      <div className={style.filter}>
        <div>
          <FormLabel className="d-flex">Mã đề thi:</FormLabel>
          <TextField
            placeholder="Mã đề thi"
            value=""
            onChange={(event) => {}}
            sx={{ height: "33px", width: "200px" }}
            size="small"
          />
        </div>
        <div>
          <FormLabel className="d-flex">Lớp học:</FormLabel>
          <Select
            value={0}
            size="small"
            name="level"
            id="level"
            sx={{ height: "33px", width: "200px" }}
            onChange={() => {}}
          >
            <MenuItem key={0} value={0}>
              --
            </MenuItem>{" "}
            {classes.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel className="d-flex">Trạng thái:</FormLabel>
          <Select
            value={-1}
            size="small"
            name="level"
            id="level"
            sx={{ height: "33px", width: "200px" }}
            onChange={() => {}}
          >
            <MenuItem key={-1} value={-1}>
              --
            </MenuItem>{" "}
            {examStatus.map((i, index) => (
              <MenuItem key={index} value={index}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button
          onClick={() => {}}
          variant="outlined"
          sx={{ height: "33px", marginLeft: "auto" }}
        >
          Tìm kiếm
        </Button>
      </div>
      <Grid
        columns={columns}
        data={data}
        sxBox={{ height: "calc(100vh - 200px)", width: "100%" }}
        action={{ edit: false, delete: true }}
        message="Bạn có muốn xóa lớp học này?"
        onDelete={(e: any) => {
          console.log(e);
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "lastName", sort: "asc" }],
          },
        }}
        onFilter={(e: any) => {
          console.log(e);
        }}
        total={10000}
      />
      <Button
        sx={{ marginTop: "16px" }}
        onClick={() => {
          setIsEdit(false);
          setIsOpenForm(true);
        }}
        variant="contained"
      >
        Thêm mới
      </Button>

      <UserForm
        open={isOpenForm}
        isEdit={isEdit}
        handleClose={() => {
          setIsEdit(false);
          setIsOpenForm(false);
        }}
        data={exam}
      />
    </div>
  );
};
export default ExamList;
