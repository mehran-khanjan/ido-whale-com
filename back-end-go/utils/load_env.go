package utils

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnvFiles() {
	err := godotenv.Load(".env.development")
	if err != nil {
		log.Fatal("Error loading .env.development file")
	} else {
		log.Printf("\nENV files have loaded correctly\n")
	}
}
