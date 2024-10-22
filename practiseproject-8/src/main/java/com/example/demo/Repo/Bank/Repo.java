package com.example.demo.Repo.Bank;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Model.Bank.BankApplication;

public interface Repo extends JpaRepository<BankApplication, Long> {

    // No need to override findById, JpaRepository already provides it
    
    @Transactional
    void deleteByAccno(Long accno); // Rename to reflect that it's deleting by account number
}
