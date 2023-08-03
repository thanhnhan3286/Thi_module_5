import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import * as songService from "../service/SongService";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";


export function ListSong() {
    const [songs, setSongs] = useState([]);
    const [songPlay, setSongPlay] = useState('');
    const [names, setNames] = useState('');
    const [page, setPage] = useState(0);
    const limit = 5;

    const nextPage = async () => {
        const res = await songService.findAll(page, limit);
        if (page < res.data.totalPages - 1) {
            setPage(page + 1);
        }
    };
    const previousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    const getSong = async (page) => {
        const res = await songService.findAll(page, limit);
        console.log(res.data.totalPages);
        setSongs(res.data.content);
    };
    const getSongPlay = async (id) => {
        setSongPlay(await songService.findSongById(id));
    }
    useEffect(() => {
        getSong(page).then(r => null);
    }, [page])
    const setStatus1 = async (values) => {
        const res = await songService.findStatus(2);
        console.log(res);
        await songService.saveSong({
            ...values,
            status: await songService.findStatus(2)
        });
        await getSong();

    }
    const setStatus = async (id) => {
        const res = await songService.findSongById(id)
        console.log(res.status.id);
        if (res.status.id === 1) {
            setStatus1(res).then(r => null);
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

    function changeStatus(id, name) {
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
                setStatus(id).then(r => null);
            }
        })
    }

    const searchSongByName = async (values) => {
        const res = await songService.findSongByName(values);
        setSongs(res);
    }
    return (
        <>
            <nav className="row right container mt-3">
                <div className="col-6">
                    <div className="row">
                        <div className="col-3"/>
                        <div className="col-9">
                            <h1>{songPlay.name}</h1>
                            <h5>{songPlay.singer}</h5>
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
                <h1 className="mt-3">Danh sách bài hát</h1>
                <nav className="row right container mt-3 mb-3">
                    <div className="col-6"/>
                    <div className="col-6 ">
                        <div className="row">
                            <div className="col-3"/>
                            <div className="col-9 d-flex">
                                <Formik
                                    initialValues={{
                                        name: ''
                                    }}
                                    onSubmit={async (values) => {
                                        await setNames(values.name);
                                    }}
                                >
                                    <Form className="d-flex">
                                        <Field name="ten" type="text" placeholder="Tên bài hát"
                                               className="form-control-md text-center"/>
                                        <button type="submit" className="btn btn-secondary"
                                                style={{marginLeft: "1%"}}>
                                            Tìm kiếm
                                        </button>
                                        <button onClick={() => getSong()} type="reset" className="btn btn-secondary"
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
                                <div className="table-responsive mb-3">
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
                                            songs.map((song, index) => (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <th>
                                                        {song.names}
                                                    </th>
                                                    <th>{song.singer}</th>
                                                    <th>{song.durations}</th>
                                                    <th>{song.likes}</th>
                                                    <th>{song.status.names}</th>
                                                    <th>
                                                        <button type="button" className=" btn-del btn btn-danger"
                                                                fdprocessedid="tkcp7c"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                onClick={() => changeStatus(`${song.id}`, `${song.name}`)}
                                                        >Công khai
                                                        </button>
                                                    </th>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <button className="btn btn-outline-secondary"
                                        onClick={() => {
                                            previousPage();
                                        }}>
                                    Trước
                                </button>
                                <span className="btn btn-outline-secondary">{page + 1}</span>
                                <button className="btn btn-outline-secondary"
                                        onClick={() => {
                                            nextPage().then(r => null);
                                        }}>
                                    Sau
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}