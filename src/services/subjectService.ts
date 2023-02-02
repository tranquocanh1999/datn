import axios from "./axiosConf";

export async function getListSubject(): Promise<any> {
  return axios().get("subject/list");
}
