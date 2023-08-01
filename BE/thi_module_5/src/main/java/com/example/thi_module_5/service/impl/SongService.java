package com.example.thi_module_5.service.impl;

import com.example.thi_module_5.model.Song;
import com.example.thi_module_5.repository.ISongRepository;
import com.example.thi_module_5.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SongService implements ISongService {
    @Autowired
    private ISongRepository iSongRepository;

    @Override
    public Page<Song> geAllSong(Pageable pageable,String names) {
        return iSongRepository.geAllSong(pageable,names);
    }
}
