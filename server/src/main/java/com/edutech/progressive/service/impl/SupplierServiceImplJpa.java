package com.edutech.progressive.service.impl;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Supplier;
import com.edutech.progressive.repository.SupplierRepository;
import com.edutech.progressive.service.SupplierService;

@Service("supplierServiceJpa")
public class SupplierServiceImplJpa implements SupplierService  {

    private SupplierRepository supplierRepo;
    

    @Autowired
    public SupplierServiceImplJpa(SupplierRepository supplierRepo) {
        this.supplierRepo = supplierRepo;
    }


    


    
    
    // @Autowired
    // public SupplierServiceImplJpa() {
    // }





    // public SupplierServiceImplJpa() {
    // }







    @Override
    public List<Supplier> getAllSuppliers() {
        // TODO Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'getAllSuppliers'");
        return supplierRepo.findAll();
    }

    @Override
    public int addSupplier(Supplier supplier) {
        // TODO Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'addSupplier'");
        Supplier s = supplierRepo.save(supplier);
        return s !=null ? s.getSupplierId(): -1;
    }

    @Override
    public List<Supplier> getAllSuppliersSortedByName() {
        // TODO Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'getAllSuppliersSortedByName'");
        List<Supplier> list = supplierRepo.findAll();
        Collections.sort(list);
        return list;
    }

    public void updateSupplier(int id, Supplier s){
        Supplier oldSupplier = supplierRepo.findById(id).orElse(null);
        oldSupplier.setAddress(s.getAddress());
        oldSupplier.setEmail(s.getEmail());
        oldSupplier.setPassword(s.getPassword());
        oldSupplier.setUsername(s.getUsername());
        oldSupplier.setPhone(s.getPhone());
        oldSupplier.setRole(s.getRole());
        oldSupplier.setSupplierName(s.getSupplierName());
        supplierRepo.save(oldSupplier);

    }
    public void deleteSupplier(int id){
        // Supplier s = supplierRepo.findById(id).orElseThrow();
        supplierRepo.deleteById(id);

    }
    
    public Supplier getSupplierById(int supplierId) {
        return supplierRepo.findById(supplierId).orElseThrow();
    }

}