import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Grid from "../../../../components/grid";
import { MoreHoriz } from "@mui/icons-material";
import QuestionDetail from "../../questions/question-detail";
import QuestionForm from "../../questions/question-form";
import style from "./user-list.module.scss";
import ClassDetailModal from "../../../../components/class-detail-modal";
import { roles } from "../../../../contants/role";
import { GridValueGetterParams } from "@mui/x-data-grid";

const UserList: React.FC = (): JSX.Element => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenClassDetail, setIsOpenClassDetail] = useState(false);
  const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
  const [student, setStudent] = useState<any>();
  const columns = [
    {
      field: "code",
      headerName: "Mã nhân viên",
      width: 120,
    },
    {
      field: "name",
      headerName: "Tên nhân viên",
      width: 200,
    },
    {
      field: "birthday",
      headerName: "Ngày sinh",
      width: 100,
    },

    {
      field: "email",
      headerName: "Mail",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "role",
      headerName: "Chức vụ",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => roles[params.row.role],
    },
    {
      field: "classes",
      headerName: "Lớp học",
      width: 250,
      sortable: false,
      renderCell(params: any) {
        return (
          <div className={style.class_info}>
            <div>{params.row.classes.length && params.row.classes[0].name}</div>
            <div className="ml-auto cursor-pointer">
              <MoreHoriz
                onClick={() => {
                  setStudent(params.row);
                  setIsOpenClassDetail(true);
                }}
              />
            </div>
          </div>
        );
      },
    },
  ];
  const data = [
    {
      id: 1,
      code: "ST001",
      name: "Trần Quốc Anh",
      birthday: "17-02-1995",
      email: "test@gmail.com",
      phone: "0367894562",
      role: 1,
      classes: [
        { id: 1, code: "ABC", name: "Lớp thầy Huấn 1" },
        { id: 2, code: "ABC", name: "Lớp thầy Huấn 2" },
        { id: 3, code: "ABC", name: "Lớp thầy Huấn 3" },
        { id: 4, code: "ABC", name: "Lớp thầy Huấn 4" },
      ],
    },
    {
      id: 2,
      code: "ST001",
      name: "Trần Quốc B",
      birthday: "17-02-1995",
      email: "test2@gmail.com",
      phone: "0367894562",
      role: 0,
      classes: [
        { id: 1, name: "Lớp thầy Huấn 1" },
        { id: 2, name: "Lớp thầy Huấn 2" },
        { id: 3, name: "Lớp thầy Huấn 3" },
        { id: 4, name: "Lớp thầy Huấn 4" },
      ],
    },
  ];
  return (
    <div>
      <div className={style.filter}>
        <TextField
          placeholder="Mã học sinh"
          value=""
          onChange={(event) => {}}
          size="small"
        />
        <TextField
          placeholder="Tên học sinh"
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
          setStudent(e);
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
      <ClassDetailModal
        open={isOpenClassDetail}
        handleClose={() => {
          setIsOpenClassDetail(false);
        }}
        classes={student?.classes}
      />
      <QuestionDetail
        open={isOpenFormDetail}
        handleClose={() => {
          setIsOpenFormDetail(false);
        }}
        data={student}
      />
      <QuestionForm
        open={isOpenForm}
        isEdit={isEdit}
        handleClose={() => {
          setIsEdit(false);
          setStudent({
            content: "",
            type: 0,
            subject: 0,
            choice_answers: [],
            correct_answers: [],
            note: "",
          });
          setIsOpenForm(false);
        }}
        data={student}
      />
    </div>
  );
};
export default UserList;
