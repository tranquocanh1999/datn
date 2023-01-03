import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Grid from "../../../../components/grid";
import ClassForm from "../class-form";
import style from "./class-list.module.scss";

const columns = [
  { field: "code", headerName: "Mã lớp học", width: 150 },
  {
    field: "name",
    headerName: "Tên lớp học",
    width: 150,
  },
  {
    field: "teacher_name",
    headerName: "Giáo viên",
    width: 150,
  },
  {
    field: "numberOfStudent",
    headerName: "Số học sinh",
    type: "number",
    width: 150,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 110,
    minWidth: 160,
    flex: 1,
  },
];
const ClassList: React.FC = (): JSX.Element => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [classInfo, setClassInfo] = useState<any>();
  const data = [
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
        <TextField
          placeholder="Mã lớp học"
          value=""
          onChange={(event) => {}}
          size="small"
        />
        <TextField
          placeholder="Tên lớp học"
          value=""
          onChange={(event) => {}}
          sx={{ height: "33px", marginLeft: "16px" }}
          size="small"
        />
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
        sxBox={{ height: "calc(100vh - 176px)", width: "100%" }}
        action={{ edit: true, delete: true }}
        message="Bạn có muốn xóa lớp học này?"
        onDelete={(e: any) => {
          console.log(e);
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "lastName", sort: "asc" }],
          },
        }}
        onEdit={(e: any) => {
          setIsEdit(true);
          setClassInfo(e);
          setIsOpenForm(true);
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
      <ClassForm
        open={isOpenForm}
        isEdit={isEdit}
        handleClose={() => {
          setIsEdit(false);
          setIsOpenForm(false);
        }}
        data={classInfo}
      />
    </div>
  );
};
export default ClassList;
