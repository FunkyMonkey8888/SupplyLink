package com.edutech.progressive.service.impl;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.edutech.progressive.config.SecurityConfig;
// import com.edutech.progressive.config.SecurityConfig;
import com.edutech.progressive.entity.Supplier;
import com.edutech.progressive.exception.SupplierAlreadyExistsException;
import com.edutech.progressive.exception.SupplierDoesNotExistException;
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




    //  @Override
    // @Secured({ "ROLE_ADMIN"})
            
    // public int addSupplier(Supplier supplier) throws SupplierAlreadyExistsException {
    //     // TODO Auto-generated method stub
    //     // throw new UnsupportedOperationException("Unimplemented method 'addSupplier'");
    //     Supplier existingSupplier = supplierRepo.findById(supplier.getSupplierId()).orElse(null);
    //     if( existingSupplier != null) throw new SupplierAlreadyExistsException("Supplier already exists");
    //     // boolean nameExists = existingSupplier.getSupplierName().equalsIgnoreCase(supplier.getSupplierName()) || existingSupplier.getEmail().equalsIgnoreCase(supplier.getEmail()) || existingSupplier.getUsername().equalsIgnoreCase(supplier.getUsername());
    //     boolean exists = supplierRepo.existsByEmailIgnoreCase(supplier.getEmail()) || supplierRepo.existsByUsernameIgnoreCase(supplier.getUsername());
    //     if(exists) throw new SupplierAlreadyExistsException("Supplier Already vExisits");
    //     Supplier s = supplierRepo.save(supplier);
    //     return s !=null ? s.getSupplierId(): -1;
    // }
    
    @Override
    public int addSupplier(Supplier supplier) throws SupplierAlreadyExistsException {
        // If client sends an id that already exists, treat as duplicate
        if (supplier.getSupplierId() != 0 &&
            supplierRepo.findById(supplier.getSupplierId()).orElse(null) != null) {
            throw new SupplierAlreadyExistsException("Supplier already exists");
        }

        // Enforce uniqueness on email / username
        boolean dup = supplierRepo.existsByEmailIgnoreCase(supplier.getEmail())
                   || supplierRepo.existsByUsernameIgnoreCase(supplier.getUsername());
        if (dup) throw new SupplierAlreadyExistsException("Supplier already exists");

        Supplier saved = supplierRepo.save(supplier);
        return saved != null ? saved.getSupplierId() : -1;
    }
    




    @Override
        
    public List<Supplier> getAllSuppliers() {
        // TODO Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'getAllSuppliers'");
        return supplierRepo.findAll();
    }

// @Override
// public int addSupplier(Supplier supplier) {
//     if (supplier == null) {
//         throw new IllegalArgumentException("Supplier must not be null");
//     }

//     boolean dup =
//         supplierRepo.existsBySupplierNameIgnoreCase(supplier.getSupplierName()) ||
//         supplierRepo.existsByEmailIgnoreCase(supplier.getEmail()) ||
//         supplierRepo.existsByUsernameIgnoreCase(supplier.getUsername());

//     if (dup) {
//         // Make SupplierAlreadyExistsException extend RuntimeException to avoid compile issues in tests
//         throw new SupplierAlreadyExistsException("Supplier already exists");
//     }

//     Supplier saved = supplierRepo.save(supplier);
//     return saved != null ? saved.getSupplierId() : -1;
// }

    


    @Override
        
    public List<Supplier> getAllSuppliersSortedByName() {
        // TODO Auto-generated method stub
        // throw new UnsupportedOperationException("Unimplemented method 'getAllSuppliersSortedByName'");
        List<Supplier> list = supplierRepo.findAll();
        Collections.sort(list);
        return list;
    }

        // @Secured({ "ROLE_ADMIN"})
                
    // public void updateSupplier(int id, Supplier s) throws SupplierAlreadyExistsException, SupplierDoesNotExistException{
        
    //     Supplier oldSupplier = supplierRepo.findById(id).orElse(null);
    //     // Supplier existingSupplier = supplierRepo.findById(s.getSupplierId()).orElse(null);
    //     if( oldSupplier == null ) throw new SupplierDoesNotExistException("null");
    //     // boolean nameExists = existingSupplier.getSupplierName().equalsIgnoreCase(s.getSupplierName()) || existingSupplier.getEmail().equalsIgnoreCase(s.getEmail()) || existingSupplier.getUsername().equalsIgnoreCase(s.getUsername());
    //     // if(nameExists) throw new SupplierAlreadyExistsException("Supplier Already vExisits");
    //     // if(oldSupplier.getSupplierName().equalsIgnoreCase(s.getSupplierName()) || oldSupplier.getEmail().equalsIgnoreCase(s.getEmail()))  throw new SupplierAlreadyExistsException("Supplier already exists");
    //     List<Supplier> suppliers = supplierRepo.findAll();
    //     for (Supplier existingSupplier : suppliers) {
    //     // if( existingSupplier != null) throw new SupplierAlreadyExistsException("Supplier already exists");
    //     boolean nameExists = existingSupplier.getSupplierName().equalsIgnoreCase(s.getSupplierName()) || existingSupplier.getEmail().equalsIgnoreCase(s.getEmail()) || existingSupplier.getUsername().equalsIgnoreCase(s.getUsername());
    //     if(nameExists) throw new SupplierAlreadyExistsException("Supplier Already vExisits");
            
    //     }
    //     oldSupplier.setAddress(s.getAddress());
    //     oldSupplier.setEmail(s.getEmail());
    //     oldSupplier.setPassword(s.getPassword());
    //     oldSupplier.setUsername(s.getUsername());
    //     oldSupplier.setPhone(s.getPhone());
    //     oldSupplier.setRole(s.getRole());
    //     oldSupplier.setSupplierName(s.getSupplierName());
    //     supplierRepo.save(oldSupplier);

    // }

    
public void updateSupplier(int id, Supplier s)
            throws SupplierAlreadyExistsException, SupplierDoesNotExistException {

        Supplier old = supplierRepo.findById(id)
                .orElseThrow(() -> new SupplierDoesNotExistException("Supplier not found: " + id));

        // Conflict only if ANOTHER supplier (different id) has same email/username
        boolean dupEmail = supplierRepo.existsByEmailIgnoreCaseAndSupplierIdNot(s.getEmail(), id);
        boolean dupUser  = supplierRepo.existsByUsernameIgnoreCaseAndSupplierIdNot(s.getUsername(), id);
        if (dupEmail || dupUser) {
            throw new SupplierAlreadyExistsException("Supplier already exists");
        }

        old.setAddress(s.getAddress());
        old.setEmail(s.getEmail());
        old.setPassword(s.getPassword());
        old.setUsername(s.getUsername());
        old.setPhone(s.getPhone());
        old.setRole(s.getRole());
        old.setSupplierName(s.getSupplierName());
        supplierRepo.save(old);
    }

    
//     public void updateSupplier(int id, Supplier s) {
//     Supplier old = supplierRepo.findById(id)
//         .orElseThrow(() -> new SupplierDoesNotExistException("Supplier not found: " + id));

//     boolean dupName = !old.getSupplierName().equalsIgnoreCase(s.getSupplierName()) &&
//                       supplierRepo.existsBySupplierNameIgnoreCase(s.getSupplierName());
//     boolean dupEmail = !old.getEmail().equalsIgnoreCase(s.getEmail()) &&
//                        supplierRepo.existsByEmailIgnoreCase(s.getEmail());
//     boolean dupUser = !old.getUsername().equalsIgnoreCase(s.getUsername()) &&
//                       supplierRepo.existsByUsernameIgnoreCase(s.getUsername());

//     if ( dupEmail || dupUser || dupName) {
//         throw new SupplierAlreadyExistsException("Supplier already exists");
//     }

//     old.setAddress(s.getAddress());
//     old.setEmail(s.getEmail());
//     old.setPassword(s.getPassword());
//     old.setUsername(s.getUsername());
//     old.setPhone(s.getPhone());
//     old.setRole(s.getRole());
//     old.setSupplierName(s.getSupplierName());
//     supplierRepo.save(old);
// }

    // @PreAuthorize("hasAnyRole('USER','ADMIN')")
    // @Secured({ "ROLE_ADMIN"})
            
    public void deleteSupplier(int id) throws SupplierDoesNotExistException{
        Supplier s = supplierRepo.findById(id).orElseThrow();
        if(s==null) throw new SupplierDoesNotExistException("Supplier does not exists");
        supplierRepo.deleteById(id);

    }
        
    public Supplier getSupplierById(int supplierId) throws SupplierDoesNotExistException {
        Supplier s = supplierRepo.findById(supplierId).orElseThrow();
        if(s==null) throw new SupplierDoesNotExistException("Supplier does not exists");
        return supplierRepo.findById(supplierId).orElseThrow();
    }



}