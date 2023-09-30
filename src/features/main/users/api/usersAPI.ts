import { instance } from "api/instance";
import { UsersResponseType } from "features/main/users/model/users-slice";

export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 10) {
    return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`);
    // .then(response => response.data)
  },
  userUnfollow(userID: number) {
    return instance.delete(`follow/${userID}`).then((response) => response);
  },
  userFollow(userID: number) {
    return instance.post(`follow/${userID}`).then((response) => response);
  },
};
