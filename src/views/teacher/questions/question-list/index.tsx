import { Button, TextField, Link } from "@mui/material";
import { GridValueGetterParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import Grid from "../../../../components/grid";
import MathEquation from "../../../../components/math/math-equation";
import {
  answers,
  questionTypes,
  subjects,
} from "../../../../contants/question";
import ClassForm from "../../class/class-form";
import QuestionDetail from "../question-detail";
import style from "./question-list.module.scss";

const QuestionList: React.FC = (): JSX.Element => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
  const [question, setQuestion] = useState<any>();
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
      field: "type",
      headerName: "Loại câu hỏi",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${questionTypes[params.row.type] || ""} `,
    },
    {
      field: "subject",
      headerName: "Môn học",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${subjects[params.row.subject] || ""} `,
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
      field: "choice_answers",
      headerName: "Đáp án trắc nghiệm",
      width: 150,
      minWidth: 150,
      sortable: false,
      flex: 1,
      renderCell(params: any) {
        return (
          <ol type="A">
            {params.row.choice_answers.map((answer: string, index: number) => (
              <li key={index}>
                {" "}
                <MathEquation value={answer} />
              </li>
            ))}
          </ol>
        );
      },
    },
    {
      field: "correct_answers",
      headerName: "Đáp án đúng",
      sortable: false,
      width: 110,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.correct_answers
          .map((answer: number) => answers[answer])
          .join(",");
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
  const data = [
    {
      id: 1,
      code: "Q001",
      content:
        "Động lực của dòng mạch rây là sự chệnh lệch áp suất thẩm thấu giữa  $\\frac{x+2}{y-1}$ dd",
      type: 0,
      subject: 0,
      choice_answers: [
        "cành và lá  $\\frac{x+2}{y-1}$ dd",
        "cành và lá",
        "rễ và thân",
        "thân và lá",
      ],
      correct_answers: [0, 1, 2],
      note: "test",
    },
    {
      id: 2,
      code: "Q001",
      content:
        "Động lực của dòng mạch rây là sự chệnh lệch áp suất thẩm thấu giữa",
      type: 1,
      subject: 1,
      choice_answers: ["lá và rễ", "cành và lá", "rễ và thân", "thân và lá"],
      correct_answers: [0],
      note: "test",
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
        getRowHeight={() => "auto"}
        columns={columns}
        data={data}
        sxBox={{ height: "calc(100vh - 175px)", width: "100%" }}
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
          setQuestion(e);
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
      <QuestionDetail
        open={isOpenFormDetail}
        handleClose={() => {
          setIsOpenFormDetail(false);
        }}
        data={question}
      />
      <ClassForm
        open={isOpenForm}
        isEdit={isEdit}
        handleClose={() => {
          setIsEdit(false);
          setIsOpenForm(false);
        }}
        data={question}
      />
    </div>
  );
};
export default QuestionList;
