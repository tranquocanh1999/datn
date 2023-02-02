import { filter } from "../shared/utils/inteface";
import axios from "./axiosConf";

export interface teacherForm {
  fullName: string;
  birthday: string;
  email: string;
  phoneNumber: string;
  classes: any;
  subjects: any;
  gender: number;
  username: string;
  password: string;
  confirmPassword: string;
  id?: string;
  role: any;
}

export async function getListTeacher(param: filter): Promise<any> {
  return axios().post("teacher/list", param);
}

export async function addTeacher(data: teacherForm): Promise<any> {
  return axios().post("teacher", data);
}

export async function removeTeacher(id: string): Promise<any> {
  return axios().get(`teacher/delete/${id}`);
}

export async function getTeacherByID(id: string): Promise<any> {
  return axios().get(`teacher/${id}`);
}

export async function updateTeacher(data: teacherForm): Promise<any> {
  return axios().post(`teacher/${data.id}`, data);
}
