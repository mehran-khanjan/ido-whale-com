package controllers

import "gorm.io/gorm"

type DBHandler struct {
	DB *gorm.DB
}

func New(d *gorm.DB) DBHandler {
	return DBHandler{d}
}
