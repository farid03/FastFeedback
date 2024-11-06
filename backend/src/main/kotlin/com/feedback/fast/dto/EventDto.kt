package com.feedback.fast.dto

data class EventDto(
    val id: Int,
    val type: String,
    val text: String,
    val answers: List<String>,
    val correctAnswerId: Int,
    val timeout: Int
)
