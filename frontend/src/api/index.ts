import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import reactHook from "alova/react";

export interface ResponseData<T> {
  data: T | undefined;
  msg: string;
  total: number;
}

export interface Fundraiser {
  ACTIVE: number;
  CAPTION: string;
  CATEGORY_ID: number;
  CITY: string;
  CURRENT_FUNDING: number;
  FUNDRAISER_ID: number;
  ORGANIZER: string;
  TARGET_FUNDING: number;
  CATEGORY_NAME: string;
}

const alovaInstance = createAlova({
  baseURL: "http://localhost:3000",
  statesHook: reactHook,
  requestAdapter: adapterFetch(),
  async responded(response) {
    return response.json();
  },
});

export default alovaInstance;
