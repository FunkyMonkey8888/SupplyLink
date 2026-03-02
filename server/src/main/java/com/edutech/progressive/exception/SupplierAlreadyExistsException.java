package com.edutech.progressive.exception;

public class SupplierAlreadyExistsException  extends RuntimeException{

    public SupplierAlreadyExistsException() {
    }

    public SupplierAlreadyExistsException(String message) {
        super(message);
    }

    public SupplierAlreadyExistsException(Throwable cause) {
        super(cause);
    }

    public SupplierAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public SupplierAlreadyExistsException(String message, Throwable cause, boolean enableSuppression,
            boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    
}