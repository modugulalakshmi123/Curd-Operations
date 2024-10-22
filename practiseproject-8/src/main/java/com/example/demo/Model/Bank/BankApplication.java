package com.example.demo.Model.Bank;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class BankApplication{
	@Id
	private int accno;
	@Column
	private String name;
	@Column
	private int bal;
	@Column
	private int phone;
	@Column
	private String location;
	public BankApplication() {
		
	}
	public BankApplication(int accno, String name, int bal, int phone, String location) {
		super();
		this.accno = accno;
		this.name = name;
		this.bal = bal;
		this.phone = phone;
		this.location = location;
	}
	public int getAccno() {
		return accno;
	}
	public void setAccno(int accno) {
		this.accno = accno;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getBal() {
		return bal;
	}
	public void setBal(int bal) {
		this.bal = bal;
	}
	public int getPhone() {
		return phone;
	}
	public void setPhone(int phone) {
		this.phone = phone;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	@Override
	public String toString() {
		return "BankApplication [accno=" + accno + ", name=" + name + ", bal=" + bal + ", phone=" + phone
				+ ", location=" + location + "]";
	}
	
	
	
}