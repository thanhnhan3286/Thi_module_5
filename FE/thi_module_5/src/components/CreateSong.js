import {useNavigate} from "react-router";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import * as songService from "../service/SongService";
import Swal from "sweetalert2";

export function CreateSong() {
    const navigate = useNavigate();
    const createBaiHat = async (values) => {
        await songService.createSong({
            ...values,
            status: await songService.findStatus(1)
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
                    name: '',
                    singer: '',
                    composer: '',
                    durations: '',
                    likes: 0,
                    status: ''
                }}
                validationSchema={yup.object({
                    name: yup.string().required('Chưa nhập tên bài hát!!!').max(100, 'Tối đa 100 ký tự!!!'),
                    singer: yup.string().required('Chưa nhập tên ca sĩ!!!').max(30, 'Tối đa 30 ký tự!!!'),
                    composer: yup.string().required('Chưa nhập tên nhạc sĩ!!!').max(30, 'Tối đa 30 ký tự!!!'),
                    durations: yup.string().required('Chưa nhập thời gian phát!!!').matches(/^([0-9]{2}):([0-9]{2})$/,'Chưa đúng định dạng hh:mm')
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
                                        <Field name="name" type="text" className="form-control" aria-label="Small"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <ErrorMessage name="name" component="span" className="text-red m-lg-3"/>
                                    <div className="input-group input-group-sm mg">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Ca sĩ</span>
                                        </div>
                                        <Field name="singer" type="text" className="form-control" aria-label="Small"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <ErrorMessage name="singer" component="span" className="text-red m-lg-3"/>
                                    <div className="input-group input-group-sm mg">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Nhạc sĩ</span>
                                        </div>
                                        <Field name="composer" type="text" className="form-control" aria-label="Small"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <ErrorMessage name="composer" component="span" className="text-red m-lg-3"/>
                                    <div className="input-group input-group-sm mg">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Thời gian phát</span>
                                        </div>
                                        <Field name="durations" type="text" placeholder="hh:mm"
                                               className="form-control"
                                               aria-label="Small"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <ErrorMessage name="durations" component="span" className="text-red m-lg-3"/>
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