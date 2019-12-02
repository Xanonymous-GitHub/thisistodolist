package controller

import (
	"../model"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func VerifiesUser(c *gin.Context) {
	var userinfo model.LoginForm
	var session model.SessionMysqlModel
	c.BindJSON(&userinfo)
	isSucceed, err := vailUser(userinfo.RecaptchaToken, c.ClientIP())
	if err != nil {
		c.String(503, "")
	}
	if !isSucceed {
		c.String(404, "")
		return
	}
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
		session.SetSession(userinfo.Username, c.ClientIP())
		c.SetCookie("sessionID", session.SessionID, 1000, "/", "trusaidlin.tk", false, false)
		c.JSON(200, `{ mes:"ok"}`)
	} else {
		c.String(403, "")
	}

}
func Getsignup(c *gin.Context) {
	c.HTML(200, "signup.html", nil)
}
func CreateNewuser(c *gin.Context) {
	var newuser model.LoginForm
	c.BindJSON(&newuser)
	isSucceed, err := vailUser(newuser.RecaptchaToken, c.ClientIP())
	if err != nil {
		c.String(503, "")
	}
	if !isSucceed {
		c.String(404, "")
		return
	}
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	err = db.Create(&newuser).Error
	if err != nil {
		c.String(403, "")
	} else {
		c.Redirect(302, "/signin")
	}

}
