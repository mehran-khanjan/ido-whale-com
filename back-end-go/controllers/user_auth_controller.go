package controllers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

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

	// d.DB.Create()
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("a")
}

func (d DBHandler) UserSignIn(w http.ResponseWriter, r *http.Request) {

}

func (d DBHandler) UserSignOut(w http.ResponseWriter, r *http.Request) {

}
