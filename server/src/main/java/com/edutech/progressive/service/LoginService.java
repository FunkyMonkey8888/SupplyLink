package com.edutech.progressive.service;

import com.edutech.progressive.entity.Supplier;
import com.edutech.progressive.exception.SupplierDoesNotExistException;
import com.edutech.progressive.repository.SupplierRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class LoginService implements UserDetailsService {

    private final SupplierRepository supplierRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(SupplierRepository supplierRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.supplierRepository = supplierRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ---------- CRUD Operations ----------

    public List<Supplier> getAllUsers() {
        return supplierRepository.findAll();
    }

    public Supplier getUserById(Integer userId) {
        return supplierRepository.findById(userId)
                .orElseThrow(SupplierDoesNotExistException::new);
    }

    public Supplier getSupplierByName(String username) {
        return supplierRepository.findByUsername(username)
                .orElseThrow(SupplierDoesNotExistException::new);
    }

    @Transactional
    public Supplier createUser(Supplier user) {
        user.setRole(normalizeRole(user.getRole()));

        if (supplierRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (supplierRepository.existsByEmailIgnoreCase(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return supplierRepository.save(user);
    }

    @Transactional
    public Supplier updateUser(Supplier incoming) {
        Supplier current = supplierRepository.findById(incoming.getSupplierId())
                .orElseThrow(SupplierDoesNotExistException::new);

        if (StringUtils.hasText(incoming.getUsername()) && !incoming.getUsername().equals(current.getUsername())) {
            if (supplierRepository.existsByUsername(incoming.getUsername())) {
                throw new IllegalArgumentException("Username already exists");
            }
            current.setUsername(incoming.getUsername());
        }

        if (StringUtils.hasText(incoming.getEmail()) && !incoming.getEmail().equalsIgnoreCase(current.getEmail())) {
            if (supplierRepository.existsByEmailIgnoreCase(incoming.getEmail())) {
                throw new IllegalArgumentException("Email already exists");
            }
            current.setEmail(incoming.getEmail());
        }

        if (StringUtils.hasText(incoming.getSupplierName())) current.setSupplierName(incoming.getSupplierName());
        if (StringUtils.hasText(incoming.getPhone()))        current.setPhone(incoming.getPhone());
        if (StringUtils.hasText(incoming.getAddress()))      current.setAddress(incoming.getAddress());

        if (StringUtils.hasText(incoming.getRole())) {
            current.setRole(normalizeRole(incoming.getRole()));
        }

        if (StringUtils.hasText(incoming.getPassword())) {
            current.setPassword(passwordEncoder.encode(incoming.getPassword()));
        }

        return supplierRepository.save(current);
    }

    @Transactional
    public void deleteUser(Integer id) {
        if (!supplierRepository.existsById(id)) {
            throw new SupplierDoesNotExistException();
        }
        supplierRepository.deleteById(id);
    }

    // ---------- Utility ----------

    private String normalizeRole(String role) {
        String r = StringUtils.hasText(role) ? role.trim().toUpperCase() : "USER";
        if (!r.equals("USER") && !r.equals("ADMIN")) {
            throw new IllegalArgumentException("Role must be USER or ADMIN");
        }
        return r;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

    Supplier s = supplierRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("username not found"));

    String dbRole = (s.getRole() == null ? "USER" : s.getRole().trim().toUpperCase());
    String authority = dbRole.startsWith("ROLE_") ? dbRole : "ROLE_" + dbRole;

    return org.springframework.security.core.userdetails.User.builder()
        .username(s.getUsername())
        .password(s.getPassword())
        .authorities(new org.springframework.security.core.authority.SimpleGrantedAuthority(authority))
        .accountLocked(false).accountExpired(false).credentialsExpired(false).disabled(false)
        .build();

    }
}
