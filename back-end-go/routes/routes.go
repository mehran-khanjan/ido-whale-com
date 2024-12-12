package routes

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mehran-khanjan/ido-whale-com/controllers"
	middleware "github.com/mehran-khanjan/ido-whale-com/middlewares"
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
	a := r.Methods(http.MethodGet).Subrouter()
	a.HandleFunc("/", h.UserHomeController)
	// about page

	// sign up , sign in and sign out
	b := r.Methods(http.MethodPost).Subrouter()
	b.HandleFunc("/sign-up", h.UserSignUp)
	b.HandleFunc("/sign-in", h.UserSignIn)

	r.Handle("/sign-out", middleware.UserAuth(http.HandlerFunc(h.UserSignOut))).Methods(http.MethodPost)
	// b.HandleFunc("/sign-out", h.UserSignOut)

	e := r.PathPrefix("/dashboard").Subrouter()
	e.HandleFunc("", h.UserDashboardController).Methods(http.MethodGet)
	e.Use(middleware.UserAuth)

	// get list users
	r.HandleFunc("/users", h.UserUsersController).Methods(http.MethodGet)

	/*
	*	Admin Routes
	 */
	// index admin
	y := r.PathPrefix("/admin").Subrouter()
	y.HandleFunc("", h.AdminHomeController).Methods(http.MethodGet)

	// get list users
	y.HandleFunc("/users", h.AdminUsersController).Methods(http.MethodGet)
	y.Use(middleware.UserAuth)
	y.Use(middleware.AdminAuth)

	return r
}
