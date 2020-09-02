package com.example.RestService.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;

@Entity

public class Car {

    @Id
    @Getter @Setter
    private String carNum;
    @Getter @Setter
    private int userId;
    @Getter @Setter
    private Boolean active;
    @Getter @Setter
    private Boolean approvedStatus;
    @Getter @Setter
    private Timestamp carAddedTime;
    @Getter @Setter
    private Timestamp carApprovedTime;

}
