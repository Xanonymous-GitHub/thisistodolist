package controller

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

	"../model"
)

const reCAPTCHAhost = "https://www.google.com/recaptcha/api/siteverify"
const secret = "6LeVCsQUAAAAAGBAV-vfrR0-oCg7YjvzmEzZLqfw"

func vailUser(token string, userIP string) (success bool, err error) {
	success = false
	var recaptchaRES model.RecaptchaResponse
	response, err := http.PostForm(reCAPTCHAhost, url.Values{"secret": {secret}, "remoteip": {userIP}, "response": {token}})
	if err != nil {
		log.Printf("POST err:%s\n", err)
		return
	}
	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Printf("READ body error:%s\n", err)
		return
	}
	err = json.Unmarshal(body, &recaptchaRES)
	if err != nil {
		log.Printf("Transfer json error:%s\n", err)
		return
	}
	success = recaptchaRES.Success
	return
}
