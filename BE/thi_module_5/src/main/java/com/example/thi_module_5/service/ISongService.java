package com.example.thi_module_5.service;

import com.example.thi_module_5.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;

public interface ISongService {

    Page<Song> geAllSong(Pageable pageable,String names);

    Page<Song> getAllSong(Pageable pageable);

    Song getSongById(Integer id);

    List<Song> searchSongByName(String name);

    void createNewSong(Song song);

    void editSong(Long id, String names, String singer, String composer, String durations, Long likes, Integer status);

    void deleteSong(Integer id);
}
