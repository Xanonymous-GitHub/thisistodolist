package controller

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

	"../model"
)

const reCAPCTHAhost = "https://www.google.com/recaptcha/api/siteverify"
const secret = "6LeVCsQUAAAAAGBAV-vfrR0-oCg7YjvzmEzZLqfw"

func vailUser(token string, userIP string) (success bool, err error) {
	success = false
	var recapcthaRES model.RecapcthaResponse
	response, err := http.PostForm(reCAPCTHAhost, url.Values{"secret": {secret}, "remoteip": {userIP}, "response": {token}})
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
	err = json.Unmarshal(body, &recapcthaRES)
	if err != nil {
		log.Printf("Transfer json error:%s\n", err)
		return
	}
	success = recapcthaRES.Success
	return
}
