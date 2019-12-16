package model

import "net"

type AuthDetail struct {
	IP       net.IP
	Username *string
	Token    *string
}
