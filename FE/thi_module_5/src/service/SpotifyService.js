import axios from "axios";

export async function findBaiHatByTen(values) {
    try {
        return (await axios.get(`http://localhost:8080/baiHat?ten_like=${values.ten}`)).data;
    }catch (e) {
        console.log(e);
    }
}


export async function createBaiHat(param) {
    try {
        await axios.post(`http://localhost:8080/baiHat`,param);
    }catch (e) {
        console.log(e);
    }
}


export async function saveBaiHat(param) {
    try {
        await axios.put(`http://localhost:8080/baiHat/` + param.id, param);
    } catch (e) {
        console.log(e);
    }
}


export async function findTrangThai(id) {
    try {
        return (await axios.get(`http://localhost:8080/trangThai/` + id)).data;
    } catch (e) {
        console.log(e);
    }
}


export async function findBaiHatById(id) {
    try {
        return (await axios.get(`http://localhost:8080/baiHat/` + id)).data;
    } catch (e) {
        console.log(e);
    }
}


export const findAll = async () => {
    try {
        return (await axios.get(`http://localhost:8080/baiHat`)).data;
    } catch (e) {
        console.log(e)
    }
}