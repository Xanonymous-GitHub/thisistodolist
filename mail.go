package main

import (
	"bytes"
	"fmt"
	"html/template"
	"net/smtp"
)

var auth smtp.Auth

func main() {
	auth = smtp.PlainAuth("", "39701965a@gmail.com", "fxmhbfrewfanrhrp", "smtp.gmail.com")
	templateData := struct {
		Name string
		URL  string
	}{
		Name: "gmail",
		URL:  "https://mail.google.com",
	}
	r := NewRequest([]string{"39701965a@gmail.com"}, "Hello entroy!", "Hello, World!")
	//err := r.ParseTemplate("template.html", templateData)
	if err := r.ParseTemplate("template.html", templateData); err == nil {
		ok, _ := r.SendEmail()
		fmt.Println(ok)
	}
}

//Request struct
type Request struct {
	from    string
	to      []string
	subject string
	body    string
}

func NewRequest(to []string, subject, body string) *Request {
	return &Request{
		to:      to,
		subject: subject,
		body:    body,
	}
}
func (r *Request) SendEmail() (bool, error) {
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	subject := "Subject: " + r.subject + "!\n"
	msg := []byte(subject + mime + "\n" + r.body)
	addr := "smtp.gmail.com:587"
	if err := smtp.SendMail(addr, auth, "39701965a@gmail.com", r.to, msg); err != nil {
		return false, err
	}
	return true, nil
}
func (r *Request) ParseTemplate(templateFileName string, data interface{}) error {
	t, err := template.ParseFiles(templateFileName)
	if err != nil {
		return err
	}
	buf := new(bytes.Buffer)
	if err = t.Execute(buf, data); err != nil {
		return err
	}
	r.body = buf.String()
	return nil
}
