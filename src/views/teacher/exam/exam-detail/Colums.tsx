import moment from "moment";
import React from "react";
import { answers } from "../../../../shared/contants/question";

const getTableColumn = (style: any, totalQuestion: number) => {
  const jsonFormat: any = [];
  jsonFormat.push({
    field: "fullName",
    headerName: "Tên học sinh",
    minWidth: 200,
    flex: 1,
  });
  jsonFormat.push({
    field: "startAt",
    headerName: "Thời gian bắt đầu",
    width: 150,
    valueGetter: (params: any) =>
      params.row.startAt
        ? moment(params.row.startAt).format("DD-MM-yyyy HH:mm")
        : "—",
  });

  jsonFormat.push({
    field: "endAt",
    headerName: "Thời gian kết thúc",
    width: 150,
    valueGetter: (params: any) =>
      params.row.endAt
        ? moment(params.row.endAt).format("DD-MM-yyyy HH:mm")
        : "—",
  });

  jsonFormat.push({
    field: "degree",
    headerName: "Điểm số",
    width: 100,
  });

  jsonFormat.push({
    field: "degree1",
    headerName: "Số câu đúng",
    width: 100,
    valueGetter: (params: any) =>
      (params.row.degree * Array.from(Array(totalQuestion).keys()).length) / 10,
  });

  jsonFormat.push({
    field: "status",
    headerName: "Tình trạng",
    width: 150,
    renderCell(params: any) {
      return (
        <div
          className={
            params.row.status === null
              ? style.todo
              : params.row.status === "0"
              ? style.in_progress
              : style.done
          }
        >
          {params.row.status === null
            ? "Chưa làm bài"
            : params.row.status === "0"
            ? "Đang làm bài"
            : "Đã nộp bài"}
        </div>
      );
    },
    valueGetter: (params: any) =>
      params.row.status === null
        ? "Chưa làm bài"
        : params.row.status === "0"
        ? "Đang làm bài"
        : "Đã nộp bài",
  });

  Array.from(Array(totalQuestion).keys()).forEach((item) => {
    jsonFormat.push({
      field: `question_${item + 1}`,
      headerName: `Câu ${item + 1}`,
      width: 75,
      renderCell(params: any) {
        return params.row.answers && params.row.answers[item] ? (
          <div
            className={
              params.row.answers[item].correct
                ? style.questionCorrect
                : style.questionWrong
            }
          >
            {params.row.answers[item].answer !== null
              ? answers[params.row.answers[item].answer]
              : "—  "}
          </div>
        ) : (
          "—"
        );
      },
      valueGetter: (params: any) =>
        params.row.answers &&
        params.row.answers[item] &&
        params.row.answers[item].answer !== null
          ? answers[params.row.answers[item].answer]
          : "—",
    });
  });

  return jsonFormat;
};

export default getTableColumn;
