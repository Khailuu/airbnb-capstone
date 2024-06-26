import { useQuery } from "@tanstack/react-query";
import { quanLyViTriService } from "../../../services/QuanLyViTriService";

export const useGetViTriPhanTran = () => {
  const q = useQuery({
    queryKey: ["GetViTriPhanTrang"],
    queryFn: async () => {
      return await quanLyViTriService.getPhanTrangTimKiem();
    },
  });
  return {
    ...q,
    data: q.data?.data.content.data,
  };
};
