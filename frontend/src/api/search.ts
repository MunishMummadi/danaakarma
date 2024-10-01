import alovaInstance, { ResponseData } from ".";

interface Category {
  CATEGORY_ID: number;
  NAME: string;
}

export const getAllCategories = () => {
  return alovaInstance.Get<ResponseData<Category[]>>("/api/allCategories");
};
