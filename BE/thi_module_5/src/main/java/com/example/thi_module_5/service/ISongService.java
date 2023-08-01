package com.example.thi_module_5.service;

import com.example.thi_module_5.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ISongService {

    Page<Song> geAllSong(Pageable pageable,String names);
}
