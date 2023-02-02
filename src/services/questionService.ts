import { filter } from "../shared/utils/inteface";
import axios from "./axiosConf";

export interface questionForm {
  content: string;
  subject: any;
  level: number;
  choiceAnswers: string[];
  correctAnswer: number;
  note: string;
  id?: string;
}

export async function getListQuestion(param: filter): Promise<any> {
  return axios().post("question/list", param);
}

export async function addQuestion(data: questionForm): Promise<any> {
  return axios().post("question", data);
}

export async function removeQuestion(id: string): Promise<any> {
  return axios().get(`question/delete/${id}`);
}

export async function getQuestionByID(id: string): Promise<any> {
  return axios().get(`question/${id}`);
}

export async function updateQuestion(data: questionForm): Promise<any> {
  return axios().post(`question/${data.id}`, data);
}
