import { Button, FormLabel, TextField } from "@mui/material";
import { GridValueGetterParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import Grid from "../../../../components/grid";
import {
  deleteClass,
  getClasses,
  setClassLoading,
} from "../../../../features/classSlice";
import { setToast } from "../../../../features/userSlice";
import { typeToast } from "../../../../shared/contants/toast";
import ClassForm from "../class-form";
import style from "./class-list.module.scss";

const columns = [
  { field: "classCode", headerName: "Mã lớp học", width: 150 },
  {
    field: "className",
    headerName: "Tên lớp học",
    width: 150,
  },
  {
    field: "teacher_name",
    headerName: "Giáo viên",
    sortable: false,
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.teacher.fullName;
    },
  },
  {
    field: "numberOfStudent",
    headerName: "Số học sinh",
    sortable: false,
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
  const [filter, setFilter] = useState({ classCode: "", className: "" });
  const [classInfo, setClassInfo] = useState<any>();
  const isLoading = useSelector((state: RootState) => state?.class?.isLoading);
  const data = useSelector((state: RootState) => state?.class?.data) || [];
  const total = useSelector((state: RootState) => state?.class?.total) || 0;
  const dispatch = useDispatch();
  const [paramGrid, setParamGrid] = useState({
    limit: 25,
    page: 1,
    order: "asc",
    sortBy: "classCode",
  });
  useEffect(() => {
    dispatch(setClassLoading(true));
  }, []);

  useEffect(() => {
    dispatch(setClassLoading(true));
  }, [paramGrid]);

  const isDisableDelete = (e: any) => {
    return e.numberOfStudent;
  };

  useEffect(() => {
    if (isLoading) {
      const param = {
        page: paramGrid.page,
        perPage: paramGrid.limit,
        filters: [
          {
            value: filter.classCode,
            name: "classCode",
          },
          {
            value: filter.className,
            name: "className",
          },
        ],
        sort: paramGrid.order
          ? {
              value: paramGrid.order,
              name: paramGrid.sortBy,
            }
          : undefined,
      };
      dispatch<any>(getClasses(param));
    }
  }, [isLoading]);

  return (
    <div>
      <div className={style.filter}>
        <div>
          <FormLabel className="d-flex">Mã lớp học:</FormLabel>
          <TextField
            placeholder="Mã lớp học"
            value={filter.classCode}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, classCode: event.target.value };
              });
            }}
            size="small"
          />
        </div>
        <div>
          <FormLabel className="d-flex">Tên lớp học:</FormLabel>
          <TextField
            placeholder="Tên lớp học"
            value={filter.className}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, className: event.target.value };
              });
            }}
            sx={{ height: "33px" }}
            size="small"
          />
        </div>
        <Button
          onClick={() => {
            dispatch(setClassLoading(true));
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
        message="Bạn có muốn xóa lớp học này?"
        isDisableDelete={isDisableDelete}
        onDelete={(e: any) => {
          dispatch<any>(deleteClass(e.id));
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "classCode", sort: "asc" }],
          },
        }}
        onEdit={(e: any) => {
          setIsEdit(true);
          setClassInfo(e);
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
