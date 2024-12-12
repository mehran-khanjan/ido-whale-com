package users

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName string `json:"firstName" validate:"required,min=5,max=20"`
	LastName  string `json:"lastName"`
	Email     string `json:"email" validate:"email,required"`
	PublicKey string `json:"publicKey"`
}
