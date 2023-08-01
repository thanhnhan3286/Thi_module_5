import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import * as spotifyService from "../service/SpotifyService";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";

export function SpotifyList() {
    const [baiHat, setBaiHat] = useState([]);
    const [baiHatHienThi, setBaiHatHienThi] = useState('');
    const getBaiHat = async () => {
        const res = await spotifyService.findAll();
        setBaiHat(res);
    };
    const getBaiHatHienThi = async (id) => {
        setBaiHatHienThi(await spotifyService.findBaiHatById(id));
    }
    useEffect(() => {
        getBaiHat().then(r => null);
    }, [])
    const setTrangThai1 = async (values) => {
        const res = await spotifyService.findTrangThai(2);
        console.log(res);
        await spotifyService.saveBaiHat({
            ...values,
            trangThai: await spotifyService.findTrangThai(2)
        });
        await getBaiHat();

    }
    const setTrangThai = async (id) => {
        const res = await spotifyService.findBaiHatById(id)
        console.log(res.trangThai.id);
        if (res.trangThai.id === 1) {
            setTrangThai1(res).then(r => null);
            await Swal.fire({
                title: "Thông báo",
                text: "Đã chuyển trạng thái từ LƯU TRỮ sang CÔNG KHAI!!!",
                timer: 2000
            })
        } else {
            await Swal.fire({
                title: "Thông báo",
                text: "Bài hát hiện đã ở trạng thái công khai!!!",
                timer: 2000
            })
        }
    }

    function thayDoiTrangThai(id, name) {
        Swal.fire({
            title: 'XÁC NHẬN',
            text: "Bạn có muốn công khai bài hát " + name + " này không?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'KHÔNG',
            confirmButtonColor: '#d33',
            confirmButtonText: 'CÓ'
        }).then((result) => {
            if (result.isConfirmed) {
                setTrangThai(id).then(r => null);
            }
        })
    }

    const searchByTen = async (values) => {
        const res = await spotifyService.findBaiHatByTen(values);
        setBaiHat(res);
    }
    return (
        <>
            <nav className="row right container mt-3">
                <div className="col-6">
                    <div className="row">
                        <div className="col-3"/>
                        <div className="col-9">
                            <h1>{baiHatHienThi.ten}</h1>
                            <h5>{baiHatHienThi.caSi}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-6 ">
                    <div className="row">
                        <div className="col-6"/>
                        <div className="col-6 d-flex text-center">
                            <Link to={`/create`} type="button" className="btn btn-success">Đăng ký bài hát</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="row room-grid text-center bg-body-secondary" style={{margin: "0 5%"}}>
                <h1 className="mt-3">Danh sách khách hàng</h1>
                <nav className="row right container mt-3 mb-3">
                    <div className="col-6"/>
                    <div className="col-6 ">
                        <div className="row">
                            <div className="col-3"/>
                            <div className="col-9 d-flex">
                                <Formik
                                    initialValues={{
                                        ten: ''
                                    }}
                                    onSubmit={async (values) => {
                                        await searchByTen(values);
                                    }}
                                >
                                    <Form className="d-flex">
                                        <Field name="ten" type="text" placeholder="Tên bài hát"
                                               className="form-control-md text-center"/>
                                        <button type="submit" className="btn btn-secondary"
                                                style={{marginLeft: "1%"}}>
                                            Tìm kiếm
                                        </button>
                                        <button onClick={() => getBaiHat()} type="reset" className="btn btn-secondary"
                                                style={{marginLeft: "1%"}}>
                                            Hủy tìm kiếm
                                        </button>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="tab-content" id="orders-table-tab-content">
                    <div className="tab-pane fade show active" id="orders-all" role="tabpanel"
                         aria-labelledby="orders-all-tab">
                        <div className="app-card app-card-orders-table shadow-sm mb-5">
                            <div className="app-card-body">
                                <div className="table-responsive">
                                    <table className="table app-table-hover mb-0 text-left">
                                        <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên bài hát</th>
                                            <th>Ca sĩ</th>
                                            <th>Thời gian phát</th>
                                            <th>Số lượt yêu thích</th>
                                            <th>Trạng thái</th>
                                            <th>Chức năng</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            baiHat.map((bai, index) => (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <th>
                                                        <button className="btn" onClick={()=>getBaiHatHienThi(bai.id)}>
                                                            {bai.ten}
                                                        </button>
                                                    </th>
                                                    <th>{bai.caSi}</th>
                                                    <th>{bai.thoiGianPhat}</th>
                                                    <th>{bai.soLuotThich}</th>
                                                    <th>{bai.trangThai.ten}</th>
                                                    <th>
                                                        <button type="button" className=" btn-del btn btn-danger"
                                                                fdprocessedid="tkcp7c"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                onClick={() => thayDoiTrangThai(`${bai.id}`, `${bai.ten}`)}
                                                        >Công khai
                                                        </button>
                                                    </th>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}