package routes

import (
	"github.com/gorilla/mux"
	adminApp "github.com/mehran-khanjan/ido-whale-com/modules/v1/app/admin"
	userApp "github.com/mehran-khanjan/ido-whale-com/modules/v1/app/user"
	adminUsers "github.com/mehran-khanjan/ido-whale-com/modules/v1/users/admin"
	userUsers "github.com/mehran-khanjan/ido-whale-com/modules/v1/users/user"
)

func Handlers() *mux.Router {
	r := mux.NewRouter().StrictSlash(false)

	/*
	*	User Routes
	 */
	// index user
	r.HandleFunc("/", userApp.UserController).Methods("GET")

	// get list users
	r.HandleFunc("/users", userUsers.UserController).Methods("GET")

	/*
	*	Admin Routes
	 */
	// index admin
	r.HandleFunc("/admin", adminApp.AdminController).Methods("GET")

	// get list users
	r.HandleFunc("/admin/users", adminUsers.AdminController).Methods("GET")

	return r
}
