import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { getAllUser } from "../../redux/reducer/userDataSlice";
import { UserService } from "../../services/UserService";
const columns = [
  {
    title: "Tài khoản",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Họ tên",
    dataIndex: "hoTen",
    key: "hoTen",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "soDT",
    key: "soDT",
  },
  {
    title: "Hành động",
    key: "hanhDong",
    render: (_, record) => (
      <div className="space-x-3">
        <button
            type="button"
            onClick={() => {
              UserService.deleteUser(record.taiKhoan)
              .then((result) => {
                window.location.href = 'http://localhost:3000/admin/qlgv'
              }).catch((err) => {
                console.log(err)
              });
            }}
            className="text-white bg-red-600 py-2 px-4 rounded-md"
          >
            Xóa
          </button>
          <a href={`/admin/updateTeacher/${record.taiKhoan}`}
            className="text-white bg-yellow-600 py-2 px-4 rounded-md"
          >
            Sửa
          </a>
      </div>
    ),
  },
];
const QuanLyTaiKhoanGV = () => {

  const dispatch = useDispatch()
    const {userList} = useSelector((state) => state.userDataSlice)
    const [userListFilter,setUserlistFilter] = useState([])

    useEffect(() =>{
      dispatch(getAllUser())
      setUserlistFilter(userList.filter((data) => data.maLoaiNguoiDung === 'GV'))
    },[])

  return (
    <div>
      <h2 className="font-bold text-2xl">Quản lý tài khoản Giáo Viên</h2>
      <div className="flex items-center justify-between">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-10/12 p-2 my-3"
          placeholder="Nhập tài khoản bạn muốn tìm kiếm"
          onChange={(event) =>{
            setUserlistFilter(
              userList.filter((data) => data.maLoaiNguoiDung === "GV" && data.taiKhoan.includes(event.target.value) )
            )
          }}
        />

        <Link to={'/admin/addNewTeacher'} className="px-3 py-2 bg-black rounded text-white font-bold">Thêm giáo viên</Link>
      </div>
      <Table
            columns={columns}
            dataSource={userListFilter}
            pagination={{
              pageSize: 10,
  
            }}
          />
      {/* {
          userListFilter.length > 0 ? (<Table
            columns={columns}
            dataSource={userListFilter}
            pagination={{
              pageSize: 10,
  
            }}
          />) : (<Table
            columns={columns}
            dataSource={userListFilter}
            pagination={{
              pageSize: 10,
  
            }}
          />)
        } */}
    </div>
  );
};

export default QuanLyTaiKhoanGV;
