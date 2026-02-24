package com.edutech.progressive.service.impl;

import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Warehouse;
import com.edutech.progressive.repository.WarehouseRepository;
import com.edutech.progressive.service.WarehouseService;


@Service("warehouseServiceJpa")
public class WarehouseServiceImplJpa implements WarehouseService  {



    private WarehouseRepository warehouseRepository;
    
    // public WarehouseServiceImplJpa() {
    // }

    
    @Autowired
    public WarehouseServiceImplJpa(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }



    @Override
    public List<Warehouse> getAllWarehouses() {
        // TODO Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'getAllWarehouses'");
        return warehouseRepository.findAll();

    }

    @Override
    public int addWarehouse(Warehouse warehouse) {
        // TODO Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'addWarehouse'");
        return warehouseRepository.save(warehouse)!= null ? warehouse.getWarehouseId() :-1;
    }

    @Override
    public List<Warehouse> getWarehousesSortedByCapacity() {
        // TODO Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'getWarehousesSortedByCapa
        // city'");
        List<Warehouse> w = warehouseRepository.findAll();
        Collections.sort(w);
        return w;
    }

    
    @Override
    @Transactional
    public void updateWarehouse(Warehouse warehouse) {
        if (warehouse == null || warehouse.getWarehouseId() == 0) return;
        Warehouse existing = warehouseRepository.findById(warehouse.getWarehouseId()).orElse(null);
        if (existing == null) return;

      
        existing.setWarehouseName(warehouse.getWarehouseName());
        existing.setLocation(warehouse.getLocation());
        existing.setCapacity(warehouse.getCapacity());

        
        try {
       
            existing.setSupplierId(warehouse.getSupplierId());
        } catch (NoSuchMethodError | Exception ignored) {
        
        }

        warehouseRepository.save(existing);
    }


    
    @Override
    public List<Warehouse> getWarehouseBySupplier(int supplierId) {
        // repository method name matches property path: supplier.supplierId
        return warehouseRepository.findAllBySupplier_SupplierId(supplierId);
    }



}