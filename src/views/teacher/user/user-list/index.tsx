/* eslint-disable react-hooks/exhaustive-deps */
import { Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "../../../../components/grid";
import style from "./user-list.module.scss";
import ClassDetailModal from "../../../../components/class-detail-modal";
import { roles } from "../../../../shared/contants/role";
import { GridValueGetterParams } from "@mui/x-data-grid";
import UserForm from "../user-form";
import { MoreHoriz } from "@mui/icons-material";
import { genders } from "../../../../shared/contants/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import {
  deleteTeacher,
  getTeachers,
  setTeacherLoading,
} from "../../../../features/teacherSlice";
import { getAllClass } from "../../../../features/classSlice";
import { getSubjectList } from "../../../../features/subjectSlice";

const UserList: React.FC = (): JSX.Element => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenClassDetail, setIsOpenClassDetail] = useState(false);
  const [user, setUser] = useState<any>();
  const columns = [
    {
      field: "username",
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
      field: "phoneNumber",
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
            {params.row.subjects?.map((subject: any, index: number) => (
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
      valueGetter: (params: GridValueGetterParams) => roles[params.row.role.id],
    },
    {
      field: "classes",
      headerName: "Lớp học",
      width: 200,
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
                    setUser(params.row);
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
    subjectID: "0",
  });
  const isLoading = useSelector(
    (state: RootState) => state?.teacher?.isLoading
  );
  const data = useSelector((state: RootState) => state?.teacher?.data) || [];
  const total = useSelector((state: RootState) => state?.teacher?.total) || 0;
  const classes =
    useSelector((state: RootState) => state?.class?.allData) || [];
  const subjects =
    useSelector((state: RootState) => state?.subject?.data) || [];
  const dispatch = useDispatch();
  const [paramGrid, setParamGrid] = useState({
    limit: 25,
    page: 1,
    order: "",
    sortBy: "",
  });

  useEffect(() => {
    dispatch(setTeacherLoading(true));
    dispatch<any>(getAllClass());
    dispatch<any>(getSubjectList());
  }, []);

  useEffect(() => {
    dispatch(setTeacherLoading(true));
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
      console.log(filter.classID);

      if (filter.subjectID && filter.subjectID !== "0") {
        filters.push({
          value: filter.subjectID,
          name: "subjectID",
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

      dispatch<any>(getTeachers(param));
    }
  }, [isLoading]);

  return (
    <div>
      <div className={style.filter}>
        <div>
          <FormLabel className="d-flex">Mã học sinh:</FormLabel>
          <TextField
            placeholder="Mã giáo viên"
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
            placeholder="Tên giáo viên"
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
            name="class"
            id="class"
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
        <div>
          <FormLabel className="d-flex">Môn giảng dạy:</FormLabel>
          <Select
            value={filter.subjectID}
            size="small"
            name="class"
            id="class"
            sx={{ height: "33px", width: "200px" }}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, subjectID: event.target.value };
              });
            }}
          >
            <MenuItem key={0} value={0}>
              --
            </MenuItem>
            {subjects.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button
          onClick={() => {
            dispatch(setTeacherLoading(true));
          }}
          variant="outlined"
          sx={{ height: "33px", marginLeft: "auto", marginTop: "auto" }}
        >
          Tìm kiếm
        </Button>
      </div>
      <Grid
        getRowHeight={(a: any) => {
          if (a.model.subjects?.length > 2) return "auto";
          return 52;
        }}
        columns={columns}
        data={data}
        sxBox={{ height: "calc(100vh - 200px)", width: "100%" }}
        action={{ edit: true, delete: true }}
        message="Bạn có muốn xóa giáo viên này?"
        onDelete={(e: any) => {
          dispatch<any>(deleteTeacher(e.id));
        }}
        initialState={{}}
        onEdit={(e: any) => {
          setIsEdit(true);
          setUser(e);
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
        classes={user?.classes}
      />
      {isOpenForm && (
        <UserForm
          open={isOpenForm}
          isEdit={isEdit}
          handleClose={() => {
            setIsEdit(false);
            setIsOpenForm(false);
          }}
          data={user}
        />
      )}
    </div>
  );
};
export default UserList;
