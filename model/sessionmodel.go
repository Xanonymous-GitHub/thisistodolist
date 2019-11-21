package model

import (
	"encoding/hex"
	"time"

	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/sha3"
)

type SessionMysqlModel struct {
	SessionID  string    `gorm:"column:sessionId"`
	Username   string    `gorm:"primary_key;column:username"`
	ClientIP   string    `gorm:"column:clientIp"`
	CreateTime time.Time `gorm:"column:createTime"`
}

func (smm *SessionMysqlModel) TableName() string {
	return "session"
}

func (smm *SessionMysqlModel) SetSession(username string, ip string) {
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()

	if err != nil {
		panic("failed to connect database")
	}
	smm.Username = username
	smm.ClientIP = ip
	smm.CreateTime = time.Now()
	smm.GetSessionID()
	var test SessionMysqlModel
	if !db.Table("session").Where("username = ?", username).First(&test).RecordNotFound() {
		db.Table("session").Where("username = ?", username).Save(&smm)
	} else {
		db.Table("session").Create(&smm)
	}

}
func (smm *SessionMysqlModel) GetSessionID() {
	hash := sha3.Sum256([]byte(smm.Username + smm.ClientIP + smm.CreateTime.String()))
	smm.SessionID = hex.EncodeToString(hash[:])
}
