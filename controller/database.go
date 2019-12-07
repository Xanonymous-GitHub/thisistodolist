package controller

import "github.com/go-pg/pg"

func InitDB() (db *pg.DB) {
	db = pg.Connect(&pg.Options{
		User:     "wayne",
		Password: "Fuck06050",
		Database: "wayne",
	})
	return
}
func ErrHandle(err error) {
	if err != nil {
		panic(err)
	}
	return
}
