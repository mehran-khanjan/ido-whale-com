package main

import (
	"net/http"

	routes "github.com/mehran-khanjan/ido-whale-com/routes"
	utils "github.com/mehran-khanjan/ido-whale-com/utils"
)

func main() {
	utils.LoadEnvFiles()

	s := &http.Server{
		Addr:    ":3001",
		Handler: routes.Handlers(),
	}
	s.ListenAndServe()
}
