/* eslint-disable react-hooks/exhaustive-deps */
import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "../../../../components/grid";
import { MoreHoriz } from "@mui/icons-material";
import style from "./student-list.module.scss";
import ClassDetailModal from "../../../../components/class-detail-modal";
import StudentForm from "../student-form";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { genders } from "../../../../shared/contants/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import {
  deleteStudent,
  getStudents,
  setStudentLoading,
} from "../../../../features/studentSlice";
import { getAllClass } from "../../../../features/classSlice";

const StudentList: React.FC = (): JSX.Element => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenClassDetail, setIsOpenClassDetail] = useState(false);
  const [student, setStudent] = useState<any>();

  const columns = [
    {
      field: "username",
      headerName: "Mã học sinh",
      width: 220,
    },
    {
      field: "fullName",
      headerName: "Tên học sinh",
      width: 250,
    },
    {
      field: "birthday",
      headerName: "Ngày sinh",
      width: 120,
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
      minWidth: 150,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "classes",
      headerName: "Lớp học",
      width: 250,
      sortable: false,
      renderCell(params: any) {
        return (
          <div className={style.class_info}>
            <div>
              {params.row.classes.length ? params.row.classes[0].className : ""}
            </div>
            <div className="ml-auto cursor-pointer">
              {params.row.classes.length > 1 && (
                <MoreHoriz
                  onClick={() => {
                    setStudent(params.row);
                    setIsOpenClassDetail(true);
                  }}
                />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  const [filter, setFilter] = useState({
    username: "",
    fullName: "",
    classID: "0",
  });
  const isLoading = useSelector(
    (state: RootState) => state?.student?.isLoading
  );
  const data = useSelector((state: RootState) => state?.student?.data) || [];
  const total = useSelector((state: RootState) => state?.student?.total) || 0;
  const classes =
    useSelector((state: RootState) => state?.class?.allData) || [];
  const dispatch = useDispatch();
  const [paramGrid, setParamGrid] = useState({
    limit: 25,
    page: 1,
    order: "",
    sortBy: "",
  });

  useEffect(() => {
    dispatch(setStudentLoading(true));
    dispatch<any>(getAllClass());
  }, []);

  useEffect(() => {
    dispatch(setStudentLoading(true));
  }, [paramGrid]);

  useEffect(() => {
    if (isLoading) {
      const filters = [
        {
          value: filter.username,
          name: "username",
        },
        {
          value: filter.fullName,
          name: "fullName",
        },
      ];
      if (filter.classID && filter.classID !== "0") {
        filters.push({
          value: filter.classID,
          name: "classID",
        });
      }
      const param = {
        page: paramGrid.page,
        perPage: paramGrid.limit,
        filters: filters,
        sort: paramGrid.order
          ? {
              value: paramGrid.order,
              name: `user.${paramGrid.sortBy}`,
            }
          : undefined,
      };

      dispatch<any>(getStudents(param));
    }
  }, [isLoading]);

  return (
    <div>
      <div className={style.filter}>
        <div>
          <FormLabel className="d-flex">Mã học sinh:</FormLabel>
          <TextField
            placeholder="Mã học sinh"
            value={filter.username}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, username: event.target.value };
              });
            }}
            size="small"
            sx={{ height: "33px", width: "200px" }}
          />
        </div>
        <div>
          <FormLabel className="d-flex">Tên học sinh:</FormLabel>
          <TextField
            placeholder="Tên học sinh"
            value={filter.fullName}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, fullName: event.target.value };
              });
            }}
            sx={{ height: "33px", width: "200px" }}
            size="small"
          />
        </div>
        <div>
          <FormLabel className="d-flex">Lớp học:</FormLabel>
          <Select
            value={filter.classID}
            size="small"
            name="level"
            id="level"
            sx={{ height: "33px", width: "200px" }}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, classID: event.target.value };
              });
            }}
          >
            <MenuItem key={0} value={0}>
              --
            </MenuItem>
            {classes.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.className}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button
          onClick={() => {
            dispatch(setStudentLoading(true));
          }}
          variant="outlined"
          sx={{ height: "33px", marginLeft: "auto", marginTop: "auto" }}
        >
          Tìm kiếm
        </Button>
      </div>
      <Grid
        columns={columns}
        data={data}
        sxBox={{ height: "calc(100vh - 200px)", width: "100%" }}
        action={{ edit: true, delete: true }}
        message="Bạn có muốn xóa học sinh này?"
        onDelete={(e: any) => {
          dispatch<any>(deleteStudent(e.id));
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "", sort: "" }],
          },
        }}
        onEdit={(e: any) => {
          setIsEdit(true);
          setStudent(e);
          setIsOpenForm(true);
        }}
        onFilter={(e: any) => {
          setParamGrid(e);
        }}
        total={total}
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

      <StudentForm
        open={isOpenForm}
        isEdit={isEdit}
        handleClose={() => {
          setIsEdit(false);
          setIsOpenForm(false);
        }}
        data={student}
      />
    </div>
  );
};
export default StudentList;
