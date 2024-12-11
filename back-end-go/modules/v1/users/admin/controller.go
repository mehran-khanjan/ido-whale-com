package users

import (
	"net/http"
)

func AdminController(res http.ResponseWriter, req *http.Request) {
	AdminService()
}
