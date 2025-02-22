package com.revature.P1DemoBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EntityScan("com.revature.P1DemoBackend.models") //Tells spring to scan this package for DB entities
@ComponentScan("com.revature") //Tells spring to scan this package for beans
@EnableJpaRepositories("com.revature.P1DemoBackend.DAOs") // Enables JPA repositories in our DAOs package
public class P1DemoBackendApplication {


	public static void main(String[] args) {
		SpringApplication.run(P1DemoBackendApplication.class, args);

		System.out.println("Employee Reimbursement App is running");

	}

}