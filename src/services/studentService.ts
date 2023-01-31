import { filter } from "../shared/utils/inteface";
import axios from "./axiosConf";

export interface studentForm {
  fullName: string;
  birthday: string;
  email: string;
  phoneNumber: string;
  classes: any;
  gender: number;
  username: string;
  password: string;
  confirmPassword: string;
  id?: string;
}

export async function getListStudent(param: filter): Promise<any> {
  return axios().post("student/list", param);
}

export async function addStudent(data: studentForm): Promise<any> {
  return axios().post("student", data);
}

export async function removeStudent(id: string): Promise<any> {
  return axios().get(`student/delete/${id}`);
}

export async function getStudentByID(id: string): Promise<any> {
  return axios().get(`student/${id}`);
}

export async function updateStudent(data: studentForm): Promise<any> {
  return axios().post(`student/${data.id}`, data);
}
