package routes

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mehran-khanjan/ido-whale-com/controllers"
	"github.com/mehran-khanjan/ido-whale-com/utils"
)

func Handlers() *mux.Router {
	d := utils.Init()
	h := controllers.New(d)
	r := mux.NewRouter().StrictSlash(false)

	/*
	*	User Routes
	 */
	// index user
	r.HandleFunc("/", h.UserHomeController).Methods(http.MethodGet)

	// sign up , sign in and sign out
	r.HandleFunc("/sign-up", h.UserSignUp)
	r.HandleFunc("/sign-in", h.UserSignIn)
	r.HandleFunc("/sign-out", h.UserSignOut)

	// get list users
	r.HandleFunc("/users", h.UserUsersController).Methods(http.MethodGet)

	/*
	*	Admin Routes
	 */
	// index admin
	r.HandleFunc("/admin", h.AdminHomeController).Methods(http.MethodGet)

	// get list users
	r.HandleFunc("/admin/users", h.AdminUsersController).Methods(http.MethodGet)

	return r
}
