package controller

import (
	"../model"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func Getlogin(c *gin.Context) {
	username, err := c.Cookie("username")
	if err != nil {
		c.HTML(200, "login.html", nil)
		return
	}
	password, err := c.Cookie("password")
	if err != nil {
		c.HTML(200, "login.html", nil)
		return
	}
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()

	if err != nil {
		panic("failed to connect database")
	}
	var userinfo model.LoginForm
	if db.Table("userinfo").Where("username = ?", username).First(&userinfo).RecordNotFound() {
		c.SetCookie("username", "", -1, "/", "35.189.167.203", false, true)
		c.SetCookie("password", "", -1, "/", "35.189.167.203", false, true)
		c.HTML(200, "login.html", nil)
		return
	}
	if userinfo.Password != password {
		c.SetCookie("username", "", -1, "/", "35.189.167.203", false, true)
		c.SetCookie("password", "", -1, "/", "35.189.167.203", false, true)
		c.HTML(200, "login.html", nil)
		return
	}

	c.Redirect(302, "/todolist")
}
func VerifiesUser(c *gin.Context) {
	var userinfo model.LoginForm
	c.BindJSON(&userinfo)
	password := userinfo.Password
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()

	if err != nil {
		panic("failed to connect database")
	}

	if db.Table("userinfo").Where("username=?", userinfo.Username).First(&userinfo).RecordNotFound() {
		c.String(403, "")
		return
	}
	if password == userinfo.Password {
		c.SetCookie("username", userinfo.Username, 1000, "/", "35.189.167.203", false, true)
		c.SetCookie("password", userinfo.Password, 1000, "/", "35.189.167.203", false, true)
		c.JSON(200, `{ mes:"ok"}`)
	} else {
		c.String(403, "")
	}

}
func Getsignup(c *gin.Context) {
	c.HTML(200, "signup.html", nil)
}
func CreateNewuser(c *gin.Context) {
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
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
