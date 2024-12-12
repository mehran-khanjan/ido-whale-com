package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
	models "github.com/mehran-khanjan/ido-whale-com/models"
)

func (d DBHandler) UserSignUp(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	body, err := io.ReadAll(r.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var u models.User
	json.Unmarshal(body, &u)
	log.Println(u)

	validate := validator.New()
	validation_err := validate.Struct(u)

	if validation_err != nil {
		// log out this error
		log.Println(validation_err)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(validation_err.Error())
		// http.Error(w, validation_err.Error(), 400)
		return
	}

	if result := d.DB.Create(&u); result.Error != nil {
		fmt.Println(result.Error)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(u.ID)
}

func (d DBHandler) UserSignIn(w http.ResponseWriter, r *http.Request) {

}

func (d DBHandler) UserSignOut(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("nothing")
}
