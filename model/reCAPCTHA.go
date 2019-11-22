package model

import "time"

type RecapcthaResponse struct {
	Success     bool      `json:"success"`
	ChallengeTS time.Time `json:"challenge_ts"`
	Hostname    string    `json:"hostname"`
	ErrCodes    []string  `json:"error-codes"`
}
