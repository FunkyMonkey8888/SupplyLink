package com.edutech.progressive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.edutech.progressive.entity.Warehouse;


@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer>{

    List<Warehouse> findAllBySupplier_SupplierId(int supplierId);
    

    @Modifying
    @Transactional
    void deleteBySupplierId(int supplierId);
    
}
