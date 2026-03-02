package com.edutech.progressive.controller;

import com.edutech.progressive.entity.Supplier;
import com.edutech.progressive.entity.Warehouse;
import com.edutech.progressive.exception.NoWarehouseFoundForSupplierException;
import com.edutech.progressive.exception.SupplierAlreadyExistsException;
import com.edutech.progressive.exception.SupplierDoesNotExistException;
import com.edutech.progressive.service.SupplierService;
import com.edutech.progressive.service.impl.SupplierServiceImplArraylist;
import com.edutech.progressive.service.impl.SupplierServiceImplJdbc;
import com.edutech.progressive.service.impl.SupplierServiceImplJpa;
import com.edutech.progressive.service.impl.WarehouseServiceImplJpa;

import org.springframework.beans.factory.annotation.Autowired;

// import java.util.List;

// @RestController
// @RequestMapping("/shipper")
// public class SupplierController {

//     public ResponseEntity<List<Supplier>> getAllSuppliers() {
//         return null;
//     }

//     public ResponseEntity<Supplier> getSupplierById(int supplierId) {
//         return null;
//     }

//     public ResponseEntity<Integer> addSupplier(Supplier supplier) {
//         return null;
//     }

//     public ResponseEntity<Void> updateSupplier(Supplier supplier) {
//         return null;
//     }

//     public ResponseEntity<Void> deleteSupplier(int supplierId) {
//         return null;
//     }

//     public ResponseEntity<List<Supplier>> getAllSuppliersFromArrayList() {
//         return null;
//     }

//     public ResponseEntity<Integer> addSupplierToArrayList(Supplier supplier) {
//         return null;
//     }

//     public ResponseEntity<List<Supplier>> getAllSuppliersSortedByNameFromArrayList() {
//         return null;
//     }
// }

// package com.supplylink.controller;

// import com.supplylink.entity.Supplier;
// import com.supplylink.service.SupplierService;
// import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

// import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/supplier")
public class SupplierController {

    private final SupplierServiceImplJpa supplierServiceJpa;
    private final SupplierService supplierServiceArraylist;

    private final WarehouseServiceImplJpa warehouseServiceJpa;


    

@Autowired
    public SupplierController(SupplierServiceImplJpa supplierServiceJpa, SupplierService supplierServiceArraylist, WarehouseServiceImplJpa warehouseServiceImplJpa) {
        this.supplierServiceJpa = supplierServiceJpa;
        this.supplierServiceArraylist = supplierServiceArraylist;
        this.warehouseServiceJpa = warehouseServiceImplJpa;
    }


    @GetMapping
    
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        List<Supplier> list = supplierServiceJpa.getAllSuppliers();
        return ResponseEntity.ok(list);
    }


    @GetMapping("/{supplierId}")
@Secured({"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<Supplier> getSupplierById(@PathVariable int supplierId) throws SupplierDoesNotExistException {
        Supplier supplier = supplierServiceJpa.getSupplierById(supplierId);
        // if (supplier == null) {
        //     throw new SupplierDoesNotExistException("Supplier does not exists");
        // }
        return ResponseEntity.ok(supplier);
    }


    @PostMapping
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<Integer> addSupplier(@RequestBody Supplier supplier) {
        // int id;
        // try {
        //     id = supplierServiceJpa.addSupplier(supplier);
        //     ResponseEntity.status(201).body(id);
        // } catch (SupplierAlreadyExistsException e) {
        //     // TODO Auto-generated catch block
        //     return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        //     // e.printStackTrace();
        // }
        return ResponseEntity.status(201).body(supplierServiceJpa.addSupplier(supplier));
    }




    
    @PutMapping("/{supplierId}")
@Secured({"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<Void> updateSupplier(@PathVariable int supplierId,
                                               @RequestBody Supplier supplier) {
        try {
            // If not found, your service should throw SupplierDoesNotExistException
            supplierServiceJpa.updateSupplier(supplierId, supplier);
            return ResponseEntity.ok().build();
        } catch (SupplierDoesNotExistException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (SupplierAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }



    
    @DeleteMapping("/{supplierId}")
@Secured({"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<Void> deleteSupplier(@PathVariable int supplierId) throws SupplierDoesNotExistException {
        if(supplierServiceJpa.getSupplierById(supplierId)== null) return ResponseEntity.status(404).build();
        supplierServiceJpa.deleteSupplier(supplierId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/fromArrayList")
    public ResponseEntity<List<Supplier>> getAllSuppliersFromArrayList() {
        List<Supplier> list = supplierServiceArraylist.getAllSuppliers();
        return ResponseEntity.ok(list);
    }


    @PostMapping("/toArrayList")
    public ResponseEntity<Integer> addSupplierToArrayList(@RequestBody Supplier supplier) throws SupplierAlreadyExistsException {
        int size = supplierServiceArraylist.addSupplier(supplier);
        return ResponseEntity.status(HttpStatus.CREATED).body(size);
    }


    @GetMapping("/fromArrayList/all")
    public ResponseEntity<List<Supplier>> getAllSuppliersSortedByNameFromArrayList() {
        List<Supplier> list = supplierServiceArraylist.getAllSuppliersSortedByName();
        return ResponseEntity.ok(list);
    }

    // @ExceptionHandler(RuntimeException.class)
    // public ResponseEntity<String> handleException(RuntimeException e){
    //     return ResponseEntity.status(500).body(e.toString());
    // }

    @GetMapping("/warehouse")
    
    public ResponseEntity<List<Warehouse>> getAllWarehouse(){
        return ResponseEntity.status(200).body(warehouseServiceJpa.getAllWarehouses());
    }

    @GetMapping("/{supplierId}/warehouse")
    
    public ResponseEntity<List<Warehouse>> getWarehousesBySupplier(@PathVariable int supplierId) throws NoWarehouseFoundForSupplierException {
        List<Warehouse> list = warehouseServiceJpa.getWarehouseBySupplier(supplierId);
        return ResponseEntity.status(200).body(list);
    }

//     @GetMapping("/{supplierId}/warehouse")
// public ResponseEntity<List<Warehouse>> getWarehousesBySupplier(
//         @PathVariable int supplierId) throws NoWarehouseFoundForSupplierException {

//     List<Warehouse> list = warehouseServiceJpa.getWarehouseBySupplier(supplierId);

//     if(list == null || list.isEmpty()) {
//         throw new NoWarehouseFoundForSupplierException("No warehouse found for supplier " + supplierId);
//     }

//     return ResponseEntity.ok(list);
// }

// @ExceptionHandler(RuntimeException.class)
// public ResponseEntity<?> handleEx(RuntimeException e){
//     return ResponseEntity.status(500).body(null);
// }

// @ExceptionHandler(SupplierAlreadyExistsException.class)
// public ResponseEntity<?> handleSupplierExists(SupplierAlreadyExistsException e) {
//             return ResponseEntity.status(HttpStatus.CONFLICT).build();
//         }

}