import {useNavigate} from "react-router";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import * as spotifyService from "../service/SpotifyService";
import Swal from "sweetalert2";

export function CreateBaiHat() {
    const navigate = useNavigate();
    const createBaiHat = async (values) => {
        await spotifyService.createBaiHat({
            ...values,
            trangThai: await spotifyService.findTrangThai(1)
        })
        navigate(`/`);
        Swal.fire({
            timer: 2000,
            title: 'Đăng ký thành công!!!',
            icon: 'success'
        }).then(r => null);
    };

    return (
        <>
            <Formik
                initialValues={{
                    ten: '',
                    caSi: '',
                    nhacSi: '',
                    thoiGianPhat: '',
                    soLuotThich: 0,
                    trangThai: ''
                }}
                validationSchema={yup.object({
                    ten: yup.string().required('Chưa nhập tên bài hát!!!').max(100, 'Tối đa 100 ký tự!!!'),
                    caSi: yup.string().required('Chưa nhập tên ca sĩ!!!').max(30, 'Tối đa 30 ký tự!!!'),
                    nhacSi: yup.string().required('Chưa nhập tên nhạc sĩ!!!').max(30, 'Tối đa 30 ký tự!!!'),
                    thoiGianPhat: yup.string().required('Chưa nhập thời gian phát!!!').matches(/^([0-9]{2}):([0-9]{2})$/,'Chưa đúng định dạng hh:mm')
                })}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(false);
                    await createBaiHat(values);
                }}>
                {
                    ({isSubmitting}) => (
                        <div className="container boxed" style={{marginTop: "2%", width: "800px", height: "auto "}}>
                            <h2 className="text-center mt-3">Đăng ký bai hát</h2>
                            <div id="form" className="form" style={{marginLeft: "10%", marginRight: "10%"}}>
                                <Form>
                                    <div className="input-group input-group-sm mg mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Tên bài hát</span>
                                        </div>
                                        <Field name="ten" type="text" className="form-control" aria-label="Small"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <ErrorMessage name="ten" component="span" className="text-red m-lg-3"/>
                                    <div className="input-group input-group-sm mg">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Ca sĩ</span>
                                        </div>
                                        <Field name="caSi" type="text" className="form-control" aria-label="Small"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <ErrorMessage name="caSi" component="span" className="text-red m-lg-3"/>
                                    <div className="input-group input-group-sm mg">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Nhạc sĩ</span>
                                        </div>
                                        <Field name="nhacSi" type="text" className="form-control" aria-label="Small"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <ErrorMessage name="nhacSi" component="span" className="text-red m-lg-3"/>
                                    <div className="input-group input-group-sm mg">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Thời gian phát</span>
                                        </div>
                                        <Field name="thoiGianPhat" type="text" placeholder="hh:mm"
                                               className="form-control"
                                               aria-label="Small"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <ErrorMessage name="thoiGianPhat" component="span" className="text-red m-lg-3"/>
                                    <br/>
                                    <div className="mb-4 text-center">
                                        <button type="submit" className="btn btn-success">Đăng ký</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )
                }
            </Formik>

        </>
    )
}