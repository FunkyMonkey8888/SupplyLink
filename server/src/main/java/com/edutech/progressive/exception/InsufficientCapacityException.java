package com.edutech.progressive.exception;


public class InsufficientCapacityException extends Exception {

    public InsufficientCapacityException() {
    }

    public InsufficientCapacityException(String message) {
        super(message);
    }

    public InsufficientCapacityException(Throwable cause) {
        super(cause);
    }

    public InsufficientCapacityException(String message, Throwable cause) {
        super(message, cause);
    }

    public InsufficientCapacityException(String message, Throwable cause, boolean enableSuppression,
            boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    // @ExceptionHandler(RuntimeException.class)
    // public ResponseEntity<String> handleException(RuntimeException e){
    //     return ResponseEntity.status(500).body(e.toString());
    // }

}