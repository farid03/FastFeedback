package com.feedback.fast.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class EventDto(
    val id: Int,
    val type: String,
    val text: String,
    val answers: List<String>,
    @JsonProperty("correct_answer_id") val correctAnswerId: Int,
    val timeout: Int
)
