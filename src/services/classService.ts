import { filter } from "../shared/utils/inteface";
import axios from "./axiosConf";

export interface classForm {
  id?: string;
  className: string;
  description: string;
}
export async function getListClass(param: filter): Promise<any> {
  return axios().post("class/list", param);
}

export async function addClass(data: classForm): Promise<any> {
  return axios().post("class", data);
}

export async function getAll(): Promise<any> {
  return axios().get(`class/all`);
}

export async function removeClass(id: string): Promise<any> {
  return axios().get(`class/delete/${id}`);
}

export async function getClassByID(id: string): Promise<any> {
  return axios().get(`class/${id}`);
}

export async function updateClass(data: classForm): Promise<any> {
  return axios().post(`class/${data.id}`, data);
}
