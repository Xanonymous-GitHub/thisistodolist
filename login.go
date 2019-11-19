package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func getlogin(c *gin.Context) {
	c.HTML(200, "login.html", nil)
}
func verifiesUser(c *gin.Context) {
	var userinfo LoginForm
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
func createNewuser(c *gin.Context) {
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist??charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	var newuser LoginForm
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
func logout(c *gin.Context) {

}
