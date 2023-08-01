package com.example.thi_module_5.repository;

import com.example.thi_module_5.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ISongRepository extends JpaRepository<Song,Long> {
    @Query(value = "SELECT  * from  song AS s where s.names LIKE concat('%',:names,'%') ",nativeQuery = true)
    Page<Song> geAllSong(Pageable pageable, @Param("names") String names);
}
