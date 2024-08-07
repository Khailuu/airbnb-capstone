import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";
import { RenderComforts } from "../../../utils/RenderComforts";
import { quanLyPhongActions } from "../../../store/quanLyPhong/slice";
import { Button, message, Popconfirm } from "antd";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const LikeRoom = () => {
  const { likeCart } = useSelector((state) => state.quanLyPhong);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const confirm = (item) => {
    dispatch(quanLyPhongActions.addLikeCart(item));
    toast.success("Bỏ thích thành công");
  };

  if (!likeCart || likeCart.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <img
          src="../../../../images/like.png"
          className="w-[30%] h-auto"
          alt=""
        />
        <p className="mb-[20px] text-rose-500 text-[40px]">
          {t("Chưa có lựa chọn yêu thích nào !")}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-[40px]">
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        {t("Danh sách phòng yêu thích")}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-10">
        {likeCart.map((item, i) => {
          let {
            id,
            hinhAnh,
            tenPhong,
            khach,
            phongNgu,
            phongTam,
            giuong,
            giaTien,
          } = item;

          return (
            <section key={i} className="shadow-lg rounded  duration-300">
              <div className="p-3">
                <img
                  style={{ width: "100%", height: "auto" }}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigate(`${PATH.details}/${id}`);
                  }}
                  src={hinhAnh}
                  alt="mainImage"
                />
                <h2 className="text-lg font-bold mt-[10px] text-[14px]">
                  {tenPhong}
                </h2>
                <div className="pt-4 pb-2">
                  <span className="span-gray">
                    {khach} {t("khach")}
                  </span>
                  <span className="span-gray">
                    {phongNgu} {t("phongNgu")}
                  </span>
                  <span className="span-gray">
                    {giuong} {t("giuong")}
                  </span>
                  <span className="span-gray">
                    {phongTam} {t("phongTam")}
                  </span>
                  <span className="span-gray bg-yellow-300">
                    {giaTien}$/{t("dem")}
                  </span>
                  <Link
                    to={`${PATH.details}/${id}`}
                    className="span-gray text-gray-50 bg-red-500"
                  >
                    {t("chiTiet")}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <div className="flex">{RenderComforts(item, "mx-1")}</div>
                  <Popconfirm
                    description="Bạn có chắc chắn muốn bỏ thích ?"
                    onConfirm={() => {
                      confirm(item);
                    }}
                    okText="Đống ý"
                    cancelText="Huỷ bỏ"
                  >
                    <Button className="w-[100px] rounded-[8px] bg-rose-500 text-white hover:bg-rose-600 transition-all ease-in-out">
                      {t("Bỏ thích")}
                    </Button>
                  </Popconfirm>
                  {/* <button
                    className="w-[100px] rounded-[8px] bg-rose-500 p-[10px] text-white hover:bg-rose-600 transition-all ease-in-out"
                    onClick={() => {
                      dispatch(quanLyPhongActions.addLikeCart(item));
                    }}
                  >
                    Bỏ thích
                  </button> */}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
