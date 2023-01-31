import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import Grid from "../../../../components/grid";
import style from "./user-list.module.scss";
import ClassDetailModal from "../../../../components/class-detail-modal";
import { roles } from "../../../../shared/contants/role";
import { GridValueGetterParams } from "@mui/x-data-grid";
import UserForm from "../user-form";
import { MoreHoriz } from "@mui/icons-material";
import { genders } from "../../../../shared/contants/user";

const UserList: React.FC = (): JSX.Element => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenClassDetail, setIsOpenClassDetail] = useState(false);
  const [user, setUser] = useState<any>();
  const columns = [
    {
      field: "code",
      headerName: "Mã nhân viên",
      width: 120,
    },
    {
      field: "fullName",
      headerName: "Tên nhân viên",
      width: 200,
    },
    {
      field: "birthday",
      headerName: "Ngày sinh",
      width: 100,
    },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        return genders[params.row.gender];
      },
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
      field: "subjects",
      headerName: "Môn giảng dạy",
      width: 150,
      minWidth: 150,
      sortable: false,
      flex: 1,
      renderCell(params: any) {
        return (
          <ul style={{ padding: "0 16px" }}>
            {params.row.subjects.map((subject: any, index: number) => (
              <li key={index}>{subject.name}</li>
            ))}
          </ul>
        );
      },
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
      width: 200,
      sortable: false,
      renderCell(params: any) {
        return (
          <div className={style.class_info}>
            <div>{params.row.classes.length && params.row.classes[0].name}</div>
            <div className="ml-auto cursor-pointer">
              <MoreHoriz
                onClick={() => {
                  setUser(params.row);
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
      fullName: "Trần Quốc Anh",
      username: "Trần Quốc Anh",
      birthday: "17-02-1995",
      gender: 1,
      subjects: [
        { id: 1, name: "Toán" },
        { id: 2, name: "Sinh học" },
      ],
      email: "test@gmail.com",
      phone: "0367894562",
      classes: [
        { id: 1, code: "ABC", name: "Lớp thầy Huấn 1" },
        { id: 2, code: "ABC", name: "Lớp thầy Huấn 2" },
        { id: 3, code: "ABC", name: "Lớp thầy Huấn 3" },
        { id: 4, code: "ABC", name: "Lớp thầy Huấn 4" },
      ],
      role: 1,
    },
    {
      id: 2,
      code: "ST001",
      fullName: "Trần Quốc B",
      username: "Trần Quốc Anh",
      birthday: "17-02-1995",
      gender: 0,
      subjects: [
        { id: 0, name: "Toán" },
        { id: 1, name: "Sinh học" },
      ],
      email: "test2@gmail.com",
      phone: "0367894562",
      classes: [
        { id: 1, code: "ABC", name: "Lớp thầy Huấn 1" },
        { id: 2, code: "ABC", name: "Lớp thầy Huấn 2" },
        { id: 3, code: "ABC", name: "Lớp thầy Huấn 3" },
        { id: 4, code: "ABC", name: "Lớp thầy Huấn 4" },
      ],
      role: 0,
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
          <FormLabel className="d-flex">Mã nhân viên:</FormLabel>
          <TextField
            placeholder="Mã nhân viên"
            value=""
            onChange={(event) => {}}
            sx={{ height: "33px", width: "200px" }}
            size="small"
          />
        </div>
        <div>
          <FormLabel className="d-flex">Tên nhân viên:</FormLabel>
          <TextField
            placeholder="Tên nhân viên"
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
        <Button
          onClick={() => {}}
          variant="outlined"
          sx={{ height: "33px", marginLeft: "auto" }}
        >
          Tìm kiếm
        </Button>
      </div>
      <Grid
        getRowHeight={(a: any) => {
          if (a.model.subjects.length > 2) return "auto";
          return 52;
        }}
        columns={columns}
        data={data}
        sxBox={{ height: "calc(100vh - 200px)", width: "100%" }}
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
          setUser(e);
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
        classes={user?.classes}
      />
      <UserForm
        open={isOpenForm}
        isEdit={isEdit}
        handleClose={() => {
          setIsEdit(false);
          setIsOpenForm(false);
        }}
        data={user}
      />
    </div>
  );
};
export default UserList;
