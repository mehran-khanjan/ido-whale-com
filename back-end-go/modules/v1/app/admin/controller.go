package app

import (
	"fmt"
	"net/http"
)

func AdminController(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "app admin controller")
}
