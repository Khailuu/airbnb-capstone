import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { quanLyUserServices } from '../../../services/QuanLyUser';
import { toast } from 'react-toastify';
import { quanLyNguoiDungAction } from "../../../store/quanLyNguoiDung/slice";

export const Avatar = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);
  const dispatch = useDispatch();
  const [imgURL, setImgURL] = useState(userLogin?.user.avatar);

  useEffect(() => {
    setImgURL(userLogin?.user.avatar);
  }, [userLogin]);

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      setImgURL(reader.result);
    });

    const formData = new FormData();
    formData.append('formFile', file);

    quanLyUserServices
      .uploadHinh(formData)
      .then((res) => {
        const newAvatarURL = res.data.content.avatar;
        dispatch(quanLyNguoiDungAction.updateUserAvatar(newAvatarURL))
        setImgURL(newAvatarURL)
        toast.success('Avatar đã được cập nhật.');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div>
      <img
        src={imgURL}
        className="w-36 h-36 object-cover rounded-full mx-auto my-5"
        alt="avatar"
      />
      <form onSubmit={onSubmit}>
        <p>Thay đổi avatar</p>
        <input className="my-2" type="file" onChange={onChange} />
        <br />
      </form>
    </div>
  );
};