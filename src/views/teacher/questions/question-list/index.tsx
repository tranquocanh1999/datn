/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Link, MenuItem, Select, FormLabel } from "@mui/material";
import { GridValueGetterParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import Grid from "../../../../components/grid";
import MathEquation from "../../../../components/math/math-equation";
import {
  deleteQuestion,
  getQuestions,
  setQuestionLoading,
} from "../../../../features/questionSlice";
import { getSubjectList } from "../../../../features/subjectSlice";
import { answers, levels } from "../../../../shared/contants/question";
import QuestionDetail from "../question-detail";
import QuestionForm from "../question-form";
import style from "./question-list.module.scss";

const QuestionList: React.FC = (): JSX.Element => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
  const [question, setQuestion] = useState<any>();
  const isLoading = useSelector(
    (state: RootState) => state?.question?.isLoading
  );
  const subjects =
    useSelector((state: RootState) => state?.subject?.data) || [];
  const data = useSelector((state: RootState) => state?.question?.data) || [];
  const total = useSelector((state: RootState) => state?.question?.total) || 0;
  const [filter, setFilter] = useState({ level: "0", subject: "0" });
  const dispatch = useDispatch();
  const [paramGrid, setParamGrid] = useState({
    limit: 25,
    page: 1,
    order: "",
    sortBy: "",
  });
  const columns = [
    {
      field: "code",
      headerName: "Mã câu hỏi",
      width: 100,
      renderCell(params: any) {
        return (
          <Link
            className="cursor-pointer"
            onClick={() => {
              setQuestion(params.row);
              setIsOpenFormDetail(true);
            }}
          >
            {params.row.code}
          </Link>
        );
      },
    },
    {
      field: "level",
      headerName: "Độ khó",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${levels[params.row.level - 1] || ""} `,
    },
    {
      field: "subject",
      headerName: "Môn học",
      width: 120,
      valueGetter: (params: GridValueGetterParams) => params.row.subject.name,
    },
    {
      field: "content",
      headerName: "Đề bài",
      minWidth: 150,
      sortable: false,
      flex: 1,
      renderCell(params: any) {
        return <MathEquation value={params.row.content} />;
      },
    },
    {
      field: "choiceAnswer",
      headerName: "Đáp án trắc nghiệm",
      width: 150,
      minWidth: 150,
      sortable: false,
      flex: 1,
      renderCell(params: any) {
        return (
          <ol type="A">
            {params.row.choiceAnswers.map((answer: string, index: number) => (
              <li key={index}>
                <MathEquation value={answer} />
              </li>
            ))}
          </ol>
        );
      },
    },
    {
      field: "correctAnswer",
      headerName: "Đáp án đúng",
      sortable: false,
      width: 110,
      valueGetter: (params: GridValueGetterParams) => {
        return answers[params.row.correctAnswer];
      },
    },
    {
      field: "note",
      headerName: "Chú thích",
      width: 150,
      sortable: false,
      minWidth: 150,
      flex: 1,
    },
  ];

  useEffect(() => {
    dispatch(setQuestionLoading(true));
    dispatch<any>(getSubjectList());
  }, []);

  useEffect(() => {
    dispatch(setQuestionLoading(true));
  }, [paramGrid]);

  useEffect(() => {
    if (isLoading) {
      const filters = [];
      if (filter.level && filter.level !== "0") {
        filters.push({
          value: filter.level,
          name: "level",
        });
      }
      if (filter.subject && filter.subject !== "0") {
        filters.push({
          value: filter.subject,
          name: "subject",
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
      dispatch<any>(getQuestions(param));
    }
  }, [isLoading]);

  return (
    <div>
      <div className={style.filter}>
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
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel className="d-flex">Độ khó:</FormLabel>
          <Select
            value={filter.level}
            size="small"
            name="level"
            id="level"
            sx={{ height: "33px", width: "200px" }}
            onChange={(event) => {
              setFilter((state) => {
                return { ...state, level: event.target.value };
              });
            }}
          >
            <MenuItem key={0} value={0}>
              --
            </MenuItem>
            {levels.map((text: string, index: number) => (
              <MenuItem key={index + 1} value={index + 1}>
                {text}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button
          onClick={() => {
            dispatch(setQuestionLoading(true));
          }}
          variant="outlined"
          sx={{ height: "33px", marginLeft: "auto", marginTop: "auto" }}
        >
          Tìm kiếm
        </Button>
      </div>
      <Grid
        getRowHeight={() => "auto"}
        columns={columns}
        data={data}
        sxBox={{ height: "calc(100vh - 200px)", width: "100%" }}
        action={{ edit: true, delete: true }}
        message="Bạn có muốn xóa câu hỏi này?"
        onDelete={(e: any) => {
          dispatch<any>(deleteQuestion(e.id));
        }}
        initialState={{}}
        onEdit={(e: any) => {
          setIsEdit(true);
          setQuestion(e);
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

      <QuestionDetail
        open={isOpenFormDetail}
        handleClose={() => {
          setIsOpenFormDetail(false);
        }}
        data={question}
      />
      <QuestionForm
        open={isOpenForm}
        isEdit={isEdit}
        handleClose={() => {
          setIsEdit(false);
          setQuestion({
            content: "",
            type: 0,
            subject: 0,
            choice_answers: [],
            correct_answers: [],
            note: "",
          });
          setIsOpenForm(false);
        }}
        data={question}
      />
    </div>
  );
};
export default QuestionList;
