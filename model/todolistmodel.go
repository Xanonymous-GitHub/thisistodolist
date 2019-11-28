package model

type (
	LoginForm struct {
		Username       string `json:"username" gorm : "primary_key;column:username"`
		Password       string `json:"password" gorm : "column : password" `
		RecaptchaToken string `json:"recapchatoken" gorm:"-"`
	}
	TodoSQLmodel struct {
		Describe string `json:"user_input" gorm:"column:todo_describe"`
		Status   bool   `json:"status" gorm:"column:todo_status"`
		ID       uint   `json:"item_id" gorm:"primary_key;column:todo_id"`
		Username string `json:"username" gorm:"column:username"`
	}
	Status struct {
		Status bool `json:"status"`
	}
)

func (todo *TodoSQLmodel) TableName() string {
	return "todo"
}
func (Lg *LoginForm) TableName() string {
	return "userinfo"
}
