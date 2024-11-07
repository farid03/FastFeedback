package com.feedback.fast.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class PollStatDto(
    @JsonProperty("connected_users_count") var connectedUsersCount: Int = 0,
    @JsonProperty("completed_poll_count") var completedPollCount: Int = 0,
    @JsonProperty("correct_responses_count") var correctResponsesCount: Int = 0
)
