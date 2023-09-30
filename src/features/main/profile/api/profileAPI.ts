import { instance, ResponseDataType } from "api/instance";
import { ProfileInfoType } from "features/main/profile/model/profile-slice";

export const profileAPI = {
  getProfile(userID: number) {
    return instance.get<ProfileInfoType>(`profile/${userID}`);
  },
  getStatus(userID: number) {
    return instance.get(`profile/status/${userID}`);
  },
  updateStatus(status: string) {
    return instance.put<ResponseDataType>(`profile/status`, { status });
  },
};
