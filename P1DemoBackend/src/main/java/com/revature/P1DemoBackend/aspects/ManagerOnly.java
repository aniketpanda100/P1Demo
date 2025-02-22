package com.revature.P1DemoBackend.aspects;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD) //This annotation can only be used over methods
@Retention(RetentionPolicy.RUNTIME) //This annotation will be available at runtime
public @interface ManagerOnly {

    //No need for fields or methods etc.

}