import alovaInstance, { Fundraiser, ResponseData } from ".";

interface getFundraiserParams {
  active?: number;
  category?: number;
  city?: string;
  organizer?: string;
}

export const getFundraiserList = (params: getFundraiserParams) =>
  alovaInstance.Get<ResponseData<Fundraiser[]>>("/api/allFundraiser", {
    params,
  });
