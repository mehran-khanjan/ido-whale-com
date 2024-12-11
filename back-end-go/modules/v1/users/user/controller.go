package users

import (
	"net/http"
)

func UserController(res http.ResponseWriter, req *http.Request) {
	UserService()
}
