package com.example.thi_module_5.repository;

import com.example.thi_module_5.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ISongRepository extends JpaRepository<Song, Long> {
    @Query(value = "SELECT  * from  song AS s where s.names LIKE concat('%',:names,'%') ", nativeQuery = true)
    Page<Song> geAllSong(Pageable pageable, @Param("names") String names);

    @Query(value = "SELECT  * from  song ", nativeQuery = true)
    Page<Song> getAllSong(Pageable pageable);

    @Query(value = "select * from song where id =:id", nativeQuery = true)
    Song findSongById(@Param("id") Integer id);

    @Query(value = "select * from  song where  names like concat('%',:name,'%')", nativeQuery = true)
    List<Song> findAllSongByName(@Param("name") String name);

    @Modifying
    @Query(value = "delete from song s where s.id = :id", nativeQuery = true)
    void deleteSongById(@Param("id") Integer id);

    @Modifying
    @Query(nativeQuery = true, value = "insert into song (names, singer, composer,durations, likes, status_id) " +
            "values (:#{#song.names},:#{#song.singer},:#{#song.composer},:#{#song.durations},:#{#song.likes},:#{#song.status.id});")
    void addNewSong(@Param("song") Song song);

    @Modifying
    @Query(value = "update song s set s.names = :names,s.singer=:singer,s.composer=:composer,s.durations=:durations,s.likes=:likes,s.status_id=:status" +
            " where s.id_song = :id", nativeQuery = true)
    void updateSongById(@Param("id") Long id, @Param("names") String names, @Param("singer") String singer, @Param("composer") String composer,
                        @Param("durations") String durations,
                        @Param("likes") Long likes, @Param("status") Integer status);
}
