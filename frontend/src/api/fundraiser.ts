import alovaInstance, { Fundraiser, ResponseData } from ".";

export const getFundraiser = (id: string) =>
  alovaInstance.Get<ResponseData<[Fundraiser]>>(`/api/fundraiser/${id}`);
