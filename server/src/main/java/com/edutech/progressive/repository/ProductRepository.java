package com.edutech.progressive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.edutech.progressive.entity.Product;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{

    Product findByProductId(@Param("productId") int productId);
    List<Product> findAllByWarehouse_WarehouseId(@Param("warehouseId") int warehouseId);
    
    @Modifying
    @Transactional
    void deleteByWarehouseId(@Param("warehouseId")int warehouseId);
}
