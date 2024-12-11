package app

import (
	"fmt"
	"net/http"
)

func UserController(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "app user controller")
}
