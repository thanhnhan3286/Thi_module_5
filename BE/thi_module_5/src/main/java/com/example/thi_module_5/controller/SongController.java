package com.example.thi_module_5.controller;

import com.example.thi_module_5.model.Song;
import com.example.thi_module_5.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConstructorBinding;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class SongController {
    @Autowired
    private ISongService iSongService;

    @GetMapping("/")
    public ResponseEntity<Page<Song>> getAll(@PageableDefault(size = 1) Pageable pageable,String names) {
        Page<Song> songPage = iSongService.geAllSong(pageable,names);
        return new ResponseEntity<>(songPage, HttpStatus.OK);
    }
}
