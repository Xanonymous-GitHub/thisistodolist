package controller

import (
	"../model"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func Getlogin(c *gin.Context) {
	c.HTML(200, "login.html", nil)
}
func VerifiesUser(c *gin.Context) {
	var userinfo model.LoginForm
	c.BindJSON(&userinfo)
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()

	if err != nil {
		panic("failed to connect database")
	}

	if db.Table("userinfo").Where("username=? password=?", userinfo.Username, userinfo.Password).First(&userinfo).RecordNotFound() {
		c.String(403, "")
	} else {
		c.SetCookie("username", userinfo.Username, 1000, "/", "35.189.167.203", false, true)
		c.SetCookie("password", userinfo.Password, 1000, "/", "35.189.167.203", false, true)
		c.String(200, "")
	}
}
func CreateNewuser(c *gin.Context) {
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist??charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	var newuser model.LoginForm
	c.BindJSON(&newuser)
	err = db.Create(&newuser).Error
	if err != nil {
		c.String(403, "")
	} else {
		c.SetCookie("username", newuser.Username, 1000, "/", "35.189.167.203", false, true)
		c.SetCookie("password", newuser.Password, 1000, "/", "35.189.167.203", false, true)
		c.String(200, "")
	}

}
func Logout(c *gin.Context) {

}