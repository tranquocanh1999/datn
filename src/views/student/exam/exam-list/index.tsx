/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "../../../../components/grid";
import style from "./exam-list.module.scss";
import { examStatus } from "../../../../shared/contants/exam";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import {
  deleteCompetition,
  getCompetitions,
  getCompetitionsByStudent,
  setCompetitionLoading,
} from "../../../../features/competitionSlice";
import { getSubjectList } from "../../../../features/subjectSlice";
import {
  getAllClass,
  getAllClassByStudent,
} from "../../../../features/classSlice";
import { useNavigate } from "react-router-dom";

const ExamList: React.FC = (): JSX.Element => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      field: "code",
      headerName: "Mã đề thi",
      width: 120,
      renderCell(params: any) {
        return (
          <Link
            className="cursor-pointer"
            onClick={() => {
              navigate(`/exam/${params.row.id}`);
            }}
          >
            {params.row.code}
          </Link>
        );
      },
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "subject",
      headerName: "Môn học",
      width: 120,
      valueGetter: (params: GridValueGetterParams) => params.row?.subject?.name,
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
      field: "classroom",
      headerName: "Lớp học",
      width: 200,
      sortable: false,
      renderCell(params: any) {
        return (
          <div className={style.class_info}>
            <div>{params.row.classroom.className}</div>
          </div>
        );
      },
    },
    {
      field: "degree",
      headerName: "Kết quả",
      sortable: false,
      width: 100,
    },
  ];
  const isLoading = useSelector(
    (state: RootState) => state?.competition?.isLoading
  );
  const subjects =
    useSelector((state: RootState) => state?.subject?.data) || [];
  const data =
    useSelector((state: RootState) => state?.competition?.data) || [];
  const total =
    useSelector((state: RootState) => state?.competition?.total) || 0;
  const classes =
    useSelector((state: RootState) => state?.class?.allData) || [];
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    code: "",
    subject: "0",
    classId: "0",
  });

  const [paramGrid, setParamGrid] = useState({
    limit: 25,
    page: 1,
    order: "",
    sortBy: "",
  });

  useEffect(() => {
    dispatch(setCompetitionLoading(true));
    dispatch<any>(getSubjectList());
    dispatch<any>(getAllClassByStudent());
  }, []);

  useEffect(() => {
    dispatch(setCompetitionLoading(true));
  }, [paramGrid]);

  useEffect(() => {
    if (isLoading) {
      const filters = [
        {
          value: filter.code,
          name: "code",
        },
      ];
      if (filter.subject && filter.subject !== "0") {
        filters.push({
          value: filter.subject,
          name: "subject",
        });
      }
      if (filter.classId && filter.classId !== "0") {
        filters.push({
          value: filter.classId,
          name: "classId",
        });
      }

      const param = {
        page: paramGrid.page,
        perPage: paramGrid.limit,
        filters: filters,

        sort: paramGrid.order
          ? {
              value: paramGrid.order,
              name: paramGrid.sortBy,
            }
          : undefined,
      };
      dispatch<any>(getCompetitionsByStudent(param));
    }
  }, [isLoading]);

  const isDisableDelete = (e: any) => {
    return e.status;
  };
  return (
    <div>
      <div className={style.filter}>
        <div>
          <FormLabel className="d-flex">Mã đề thi:</FormLabel>
          <TextField
            placeholder="Mã đề thi"
            value={filter.code}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, code: event.target.value };
              });
            }}
            sx={{ height: "33px", width: "200px" }}
            size="small"
          />
        </div>
        <div>
          <FormLabel className="d-flex">Lớp học:</FormLabel>
          <Select
            value={filter.classId}
            size="small"
            name="class"
            id="class"
            sx={{ height: "33px", width: "200px" }}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, classId: event.target.value };
              });
            }}
          >
            <MenuItem key={0} value={"0"}>
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
          <FormLabel className="d-flex">Môn học:</FormLabel>
          <Select
            value={filter.subject}
            size="small"
            name="subject"
            id="subject"
            sx={{ height: "33px", width: "200px" }}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, subject: event.target.value };
              });
            }}
          >
            <MenuItem key={0} value={0}>
              --
            </MenuItem>
            {subjects.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button
          onClick={() => {
            dispatch(setCompetitionLoading(true));
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
        action={{ edit: false, delete: false }}
        message=""
        isDisableDelete={isDisableDelete}
        initialState={{}}
        onFilter={(e: any) => {
          setParamGrid(e);
        }}
        total={total}
      />
    </div>
  );
};
export default ExamList;
