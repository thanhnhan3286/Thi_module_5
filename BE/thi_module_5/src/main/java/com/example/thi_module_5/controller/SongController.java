package com.example.thi_module_5.controller;

import com.example.thi_module_5.model.Song;
import com.example.thi_module_5.service.ISongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConstructorBinding;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class SongController {
    @Autowired
    private ISongService iSongService;

    //    @GetMapping("/")
//    public ResponseEntity<Page<Song>> getAll(@PageableDefault(size = 1) Pageable pageable, String names) {
//        Page<Song> songPage = iSongService.geAllSong(pageable, names);
//        return new ResponseEntity<>(songPage, HttpStatus.OK);
//    }
    @GetMapping("/{page}/{limit}")
    public ResponseEntity<Page<Song>> getAllSongs(@PathVariable Integer page, @PathVariable Integer limit) {
        Pageable pageable = PageRequest.of(page, limit);
        if (iSongService.getAllSong(pageable).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iSongService.getAllSong(pageable), HttpStatus.OK);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findSongById(@PathVariable Integer id) {
        Song song = iSongService.getSongById(id);
        if (song == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(song, HttpStatus.OK);
    }
    @GetMapping("/search/{name}")
    public ResponseEntity<?>searchSongByName(@PathVariable String name){
        if (name==null){
            name="";
        }
        List<Song> songList = iSongService.searchSongByName(name);
        if (songList==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return  new ResponseEntity<>(songList,HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> createNewSong(@RequestBody Song song) {
        iSongService.createNewSong(song);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSongById(@PathVariable Integer id) {
        if (iSongService.getSongById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iSongService.deleteSong(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSong(@RequestBody Song song) {
        iSongService.editSong(song.getId(), song.getNames(), song.getSinger(), song.getComposer(), song.getDurations(), song.getLikes(), song.getStatus().getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
