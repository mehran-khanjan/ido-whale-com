package users

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName string `json:"firstName"`
	LasttName string `json:"lastName"`
	Email     string `json:"email"`
	PublicKey string `json:"publicKey"`
}
