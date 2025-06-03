import { filter } from "../shared/utils/inteface";
import axios from "./axiosConf";

export interface competitionForm {
  code: string;
  title: string;
  time: number;
  subject: any;
  class?: string;
  numberOfExam: number;
  classroom: any;
  hasQuestionLv1: boolean;
  numberOfQuestionLv1: number;
  hasQuestionLv2: boolean;
  numberOfQuestionLv2: number;
  hasQuestionLv3: boolean;
  numberOfQuestionLv3: number;
  hasQuestionLv4: boolean;
  numberOfQuestionLv4: number;
}

export async function getListCompetition(param: filter): Promise<any> {
  return axios().post("competition/list", param);
}

export async function addCompetition(data: competitionForm): Promise<any> {
  return axios().post("competition", data);
}

export async function removeCompetition(id: string): Promise<any> {
  return axios().get(`competition/delete/${id}`);
}

export async function getCompetitionByID(id: string): Promise<any> {
  return axios().get(`competition/${id}`);
}

export async function getCompetitionExams(id: string): Promise<any> {
  return axios().get(`competition/exams/${id}`);
}

export async function changeStatus(id: string, status: number): Promise<any> {
  return axios().get(`competition/exams/status/${id}`, {
    params: {
      status,
    },
  });
}

export async function getListCompetitionByStudent(param: filter): Promise<any> {
  return axios().post("student-exam/list", param);
}

export async function getCompetitionExamByStudent(id: string): Promise<any> {
  return axios().get(`student-exam/exams/${id}`);
}

export async function startExam(id: string): Promise<any> {
  return axios().get(`student-exam/exam/start/${id}`);
}

export async function submitExam(id: string, data: any): Promise<any> {
  return axios().post(`student-exam/exam/success/${id}`, data);
}

export async function getExamStudents(id: string): Promise<any> {
  return axios().get(`student-exam/exam/student/${id}`);
}

export async function getDegreeData(id: string): Promise<any> {
  return axios().get(`student-exam/exam/degree-graph/${id}`);
}
