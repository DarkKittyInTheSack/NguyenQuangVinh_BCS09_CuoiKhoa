import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { getLocalStore } from "../../utils/local";
import { CoursesService } from "../../services/CoursesService";
import { useAllCategory } from "../../components/customCategoryHook";

import { useCourseById } from "../../components/customGetCourseById";

const UpdateCourses = () => {
  const location = useLocation().pathname.split("/")[3];
  const courses = useCourseById(location);

  const [imagePicker, setImagePicker] = useState();
  const [dateTimePicker, setDatetimePicker] = useState("");
  const user = getLocalStore("user_info");
  const category = useAllCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() =>{
    let defaultValues = {}
    defaultValues.maKhoaHoc = location
    defaultValues.biDanh = courses.biDanh
    defaultValues.tenKhoaHoc = courses.tenKhoaHoc
    defaultValues.moTa = courses.moTa
    defaultValues.luotXem = courses.luotXem
    defaultValues.danhGia = courses ? courses.danhGia : 0
    defaultValues.hinhAnh = courses.hinhAnh
    defaultValues.maNhom = "GP01"
    defaultValues.ngayTao = courses.ngayTao
    defaultValues.maDanhMucKhoaHoc = courses.danhMucKhoaHoc
    defaultValues.taiKhoanNguoiTao = user.taiKhoan
    reset({...defaultValues})
  },[])

  const onSubmit = (data) => {
    data.hinhAnh = data.hinhAnh[0];
    data.ngayTao = dateTimePicker;

    let formDataSubmit = new FormData();
    for (let key in data) {
      if (key === "hinhAnh") {
        formDataSubmit.append("File", data[key]);
      }
      if (key === "danhGia"){
        formDataSubmit.append(key,0);
      }
       else {
        formDataSubmit.append(key, data[key]);
      }
    }

    console.log(data);

    CoursesService.updateCurrentCourses(formDataSubmit)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-10">
        <h2 className="font-bold font-sans text-2xl ">Update Current Course</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="font-bold space-y-3">
          <li>
            <div className="flex items-center space-x-2">
              <div className="w-1/2">
                <input
                  type="text"
                  disabled
                  {...register("maKhoaHoc")}
                  placeholder="Course Code"
                  className="font-normal text-base p-3 placeholder:font-bold outline-none border border-black w-full"
                />

<input
                  type="text"
                  disabled
                  {...register("luotXem")}
                  placeholder="Course Code"
                  className="hidden font-normal text-base p-3 placeholder:font-bold outline-none border border-black w-full"
                  value={courses.luotXem}
                />

<input
                  type="text"
                  disabled
                  {...register("danhGia")}
                  placeholder="Course Code"
                  className="hidden font-normal text-base p-3 placeholder:font-bold outline-none border border-black w-full"
                  value={courses.luotXem}
                />
              </div>

              <div className="w-1/2">
                <input
                  type="text"
                  {...register("biDanh", {
                    required: "Course Alias is required",
                  })}
                  defaultValue={courses.biDanh}
                  placeholder="Course Alias"
                  className="font-normal text-base p-3 placeholder:font-bold outline-none border border-black w-full"
                />
              </div>
            </div>
          </li>
          <li>
            <input
              type="text"
              {...register("tenKhoaHoc", {
                required: "Course Code is required",
              })}
              defaultValue={courses.tenKhoaHoc}
              placeholder="Course Name"
              className="font-normal text-base p-3 placeholder:font-bold outline-none border border-black w-full"
            />
          </li>
          <li>
            <textarea
              {...register("moTa")}
              className="font-bold text-base p-3 placeholder:font-bold outline-none border border-black w-full rounded-none hover:border-black"
              rows={4}
              defaultValue={courses.moTa}
              placeholder="Course Description "
            />
          </li>
          <li>
            <select
              {...register("maDanhMucKhoaHoc", {required: 'Course Category is required'})}
              className="font-bold text-base p-3 placeholder:font-bold outline-none border border-black w-full"
            >
              {category
                ? category.map((item) => {
                    const { maDanhMuc, tenDanhMuc } = item;
                    const categoryKey = "categoryAdminKeyData" + maDanhMuc;
                    return (
                      <option key={categoryKey} value={maDanhMuc}>
                        {tenDanhMuc}
                      </option>
                    );
                  })
                : null}
            </select>
          </li>
        </ul>
        <ul className="font-bold space-y-3 my-10">
          <li>
            <label htmlFor="date">Date created:</label>
            <DatePicker
              {...register("ngayTao")}
              className="mx-3 font-bold text-base"
              onChange={(date, dateString) => {
                setDatetimePicker(dateString.replaceAll("-", "/"));
              }}
              format={"DD-MM-YYYY"}
            />
          </li>
          <li>
            <label htmlFor="image">Course Image:</label>
            <input
              type="file"
              {...register("hinhAnh", { required: "Course Image is required" })}
              accept="image/*"
              className="mx-3"
              onChange={(event) => {
                const image = event.target.files[0];
                if (image) {
                  const imageUrl = URL.createObjectURL(image);
                  setImagePicker(imageUrl);
                }
              }}
            />
            <div className="w-1/4 my-3">
              <img src={courses.hinhAnh} alt="" className="w-full block" />
            </div>
          </li>
          <li>
            <button
              type="submit"
              className="bg-black text-base font-bold py-3 w-full text-white my-10"
            >
              Update this courses
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default UpdateCourses;
