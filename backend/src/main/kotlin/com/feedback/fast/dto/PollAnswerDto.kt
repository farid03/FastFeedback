package com.feedback.fast.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class PollAnswerDto(
    @JsonProperty("asnwer") val answer: String
)
