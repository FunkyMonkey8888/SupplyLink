package com.edutech.progressive.service;

import com.edutech.progressive.entity.Supplier;
import com.edutech.progressive.repository.SupplierRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;


@Service
public class LoginService implements UserDetailsService {

    private final SupplierRepository supplierRepository;


    

    public LoginService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    // @GetMapping
    public List<Supplier> getAllUsers() {
        return null;
    }

    public Optional<Supplier> getUserById(Integer userId) {
        return null;
    }

    public Supplier getSupplierByName(String username) {
        return null;
    }

    public Supplier createUser(Supplier user) {
        return null;
    }

    public Supplier updateUser(Supplier user) {
        return null;
    }

    public void deleteUser(Integer id) {
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return null;
    }
}