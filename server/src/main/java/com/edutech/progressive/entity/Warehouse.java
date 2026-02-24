package com.edutech.progressive.entity;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

// import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
// import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

// import org.springframework.beans.factory.annotation.Autowired;


@Entity
@Table(name = "warehouse")
public class Warehouse implements Comparable<Warehouse>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private int warehouseId;
    // @ManyToOne
    // @JoinColumn(name = "supplier_id")
    @Column(name = "supplier_id", nullable = false, insertable = false)
    private int supplierId;
    @Column(name = "warehouse_name", nullable = false)
    private String warehouseName;
    @Column(name = "location", nullable = false)
    private String location;
    @Column(name = "capacity", nullable = false)
    private int capacity;

    
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name="supplier_id", nullable = false, insertable = false, updatable = false)
    private Supplier supplier;

    
    // Association: Warehouse (1) -> (M) Products
    @OneToMany(mappedBy = "warehouse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products = new ArrayList<>();


    
    public Warehouse(int warehouseId, int supplierId, String warehouseName, String location, int capacity) {
        this.warehouseId = warehouseId;
        this.supplierId = supplierId;
        this.warehouseName = warehouseName;
        this.location = location;
        this.capacity = capacity;
    }
    public Warehouse() {
    }
    public int getWarehouseId() {
        return warehouseId;
    }
    public void setWarehouseId(int warehouseId) {
        this.warehouseId = warehouseId;
    }
    public int getSupplierId() {
        return supplierId;
    }
    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }
    public String getWarehouseName() {
        return warehouseName;
    }
    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public int getCapacity() {
        return capacity;
    }
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
    

@Override
public int compareTo(Warehouse o) {
    // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'compareTo'");
    return Integer.compare(this.capacity, o.capacity);
}

public final static Comparator<Warehouse> nameComp = Comparator.comparing(Warehouse::getWarehouseName);
@Override
public String toString() {
    return "Warehouse [warehouseId=" + warehouseId + ", supplierId=" + supplierId + ", warehouseName=" + warehouseName
            + ", location=" + location + ", capacity=" + capacity + "]";
}



    

}