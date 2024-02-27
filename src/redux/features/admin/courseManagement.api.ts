import { TQueryParams, TResponseRedux } from "../../../constants/global";
import { TSemester } from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
    getAllRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegisteredSemesterQuery,
} = courseManagementApi;
