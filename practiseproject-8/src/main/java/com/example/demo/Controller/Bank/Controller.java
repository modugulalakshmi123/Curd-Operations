package com.example.demo.Controller.Bank;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Bank.BankApplication;
import com.example.demo.Repo.Bank.Repo;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/connect")
public class Controller {

    @Autowired
    private Repo bankRepo;

    // POST method to add a new BankApplication
    @PostMapping("/add")
    public String bankApplication(@RequestBody BankApplication d) {
        int data = d.getAccno(); 
        Optional<BankApplication> existing = bankRepo.findById((long) data); 

        if (existing.isEmpty()) {
            bankRepo.save(d);
            return "Added";
        } else {
            return "User already exists";
        }
    }

    // GET method to retrieve all BankApplication data
    @GetMapping("/getServices")
    public List<BankApplication> getData() {
        return bankRepo.findAll();
    }

    // PUT method to update an existing BankApplication
    @PutMapping("/update/{accno}")
    public String updateApplication(@PathVariable Long accno, @RequestBody BankApplication updatedApplication) {
        Optional<BankApplication> existing = bankRepo.findById(accno);

        if (existing.isPresent()) {
            BankApplication application = existing.get();
            application.setAccno(updatedApplication.getAccno());
            application.setName(updatedApplication.getName());
            application.setBal(updatedApplication.getBal());
            application.setPhone(updatedApplication.getPhone());
            application.setLocation(updatedApplication.getLocation());
            // Add more fields as necessary
            bankRepo.save(application);
            return "Updated";
        } else {
            return "BankApplication not found";
        }
    }

    // DELETE method to delete a BankApplication based on accno
    @DeleteMapping("/delete/{accno}")
    public String deleteApplication(@PathVariable Long accno) {
        Optional<BankApplication> existing = bankRepo.findById(accno);

        if (existing.isPresent()) {
            bankRepo.deleteById(accno);
            return "Deleted";
        } else {
            return "BankApplication not found";
        }
    }
}
