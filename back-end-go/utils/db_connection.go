package utils

import (
	"log"
	"os"

	models "github.com/mehran-khanjan/ido-whale-com/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Init() *gorm.DB {
	POSTGRES_HOST := os.Getenv("POSTGRES_HOST")
	POSTGRES_PORT := os.Getenv("POSTGRES_PORT")
	POSTGRES_DATABASE := os.Getenv("POSTGRES_DATABASE")
	POSTGRES_USER := os.Getenv("POSTGRES_USER")
	POSTGRES_PASSWORD := os.Getenv("POSTGRES_PASSWORD")

	dbURL := "postgres://" + POSTGRES_USER + ":" +
		POSTGRES_PASSWORD + "@" + POSTGRES_HOST + ":" +
		POSTGRES_PORT + "/" + POSTGRES_DATABASE

	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(&models.User{})

	return db
}
