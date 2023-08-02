package com.example.thi_module_5.service.impl;

import com.example.thi_module_5.model.Song;
import com.example.thi_module_5.repository.ISongRepository;
import com.example.thi_module_5.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService implements ISongService {
    @Autowired
    private ISongRepository iSongRepository;

    @Override
    public Page<Song> geAllSong(Pageable pageable,String names) {
        return iSongRepository.geAllSong(pageable,names);
    }

    @Override
    public Page<Song> getAllSong(Pageable pageable) {
        return iSongRepository.getAllSong(pageable);
    }


    @Override
    public Song getSongById(Integer id) {
        return iSongRepository.findSongById(id);
    }

    @Override
    public List<Song> searchSongByName(String name) {
        return iSongRepository.findAllSongByName(name);
    }

    @Override
    public void createNewSong(Song song) {
        iSongRepository.addNewSong(song);
    }

    @Override
    public void editSong(Long id, String names, String singer, String composer, String durations, Long likes, Integer status) {
        iSongRepository.updateSongById(id, names, singer, composer, durations, likes, status);
    }

    @Override
    public void deleteSong(Integer id) {
        iSongRepository.deleteSongById(id);
    }
}
