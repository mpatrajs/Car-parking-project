package com.example.RestService;

import com.example.RestService.model.Person;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;

import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class APITests {

    String base_url = "/api/v1/person/";

    @Autowired
    private MockMvc mvc;

    @Test
    public void A_itShouldGetTheWholePersonListFromDatabase() throws Exception {
        this.mvc.perform(get(base_url))
                .andExpect(status().isOk());
    }

    @Test
    public void B_itShouldAddPersonToDatabase() throws Exception {
        this.mvc.perform(post(base_url)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":222456,\"carNum\":\"GH5050\"}"))
                .andExpect(status().isCreated());
    }

    @Test
    public void C_itShouldAddPersonToDatabaseWithExistingId() throws Exception {
        this.mvc.perform(post(base_url)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":222456,\"carNum\":\"FU6655\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void D_itShouldAddPersonToDatabaseWithExistingCarNumber() throws Exception {
        this.mvc.perform(post(base_url)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":666777,\"carNum\":\"GH5050\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void E_itShouldFindThePersonIdInDatabase() throws Exception {
        int id = 222456;
        this.mvc.perform(get(base_url + id))
                .andExpect(status().isFound());
    }

    @Test
    public void F_itShouldUpdatePersonCarNum() throws Exception {
        int id = 222456;
        this.mvc.perform(put(base_url + "updateCar/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"carNum\":\"TY1505\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void G_itShouldUpdatePersonRegistrationStatus() throws Exception {
        int id = 222456;
        this.mvc.perform(put(base_url + "updateRegistered/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"registered\":true}"))
                .andExpect(status().isOk());
    }

    @Test
    public void H_itShouldReturnErrorBecauseItCantFindPersonById() throws Exception {
        int id = 1;
        this.mvc.perform(get(base_url + id))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void I_itShouldDeletePersonFromDatabaseById() throws Exception {
        int id = 222456;
        this.mvc.perform(delete(base_url + id))
                .andExpect(status().isOk());
    }

    @Test
    public void J_itShouldReturnErrorBecausePersonFieldsAreEmpty() throws Exception {
        this.mvc.perform(post(base_url)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":,\"carNum\":}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void K_itShouldReturnErrorBecauseDoesntExistPersonWithIdToDelete() throws Exception {
        int id = 1;
        this.mvc.perform(delete(base_url + id))
                .andExpect(status().isBadRequest());
    }

}