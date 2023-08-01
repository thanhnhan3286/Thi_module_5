import axios from "axios";

export async function findSongByName(values) {
    try {
        return (await axios.get(`http://localhost:8080/song?name_like=${values.name}`)).data;
    }catch (e) {
        console.log(e);
    }
}


export async function createSong(param) {
    try {
        await axios.post(`http://localhost:8080/song`,param);
    }catch (e) {
        console.log(e);
    }
}


export async function saveSong(param) {
    try {
        await axios.put(`http://localhost:8080/song/` + param.id, param);
    } catch (e) {
        console.log(e);
    }
}


export async function findStatus(id) {
    try {
        return (await axios.get(`http://localhost:8080/status/` + id)).data;
    } catch (e) {
        console.log(e);
    }
}


export async function findSongById(id) {
    try {
        return (await axios.get(`http://localhost:8080/song/` + id)).data;
    } catch (e) {
        console.log(e);
    }
}


export const findAll = async (names) => {
    try {
        return (await axios.get(`http://localhost:8080/api/?names=${names}`)).data;
    } catch (e) {
        console.log(e)
    }
}