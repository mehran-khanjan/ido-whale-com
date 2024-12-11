package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	models "github.com/mehran-khanjan/ido-whale-com/models"
)

func (d DBHandler) UserHomeController(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf(w, "app user controller")

	// Read dynamic id parameter
	// vars := mux.Vars(r)
	// id, _ := strconv.Atoi(vars["id"])

	// Find book by Id
	var user models.User

	if result := d.DB.First(&user, "1"); result.Error != nil {
		fmt.Println(result.Error)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode("record not found")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
