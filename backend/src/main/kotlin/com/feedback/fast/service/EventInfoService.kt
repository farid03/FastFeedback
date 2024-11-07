package com.feedback.fast.service

import com.feedback.fast.dto.EventDto
import com.feedback.fast.dto.PollAnswerDto
import com.feedback.fast.dto.PollStatDto
import org.springframework.stereotype.Service
import java.util.*

@Service
class EventInfoService() {
    private val lectionsWithConnectedUsersCount = mutableMapOf<String, Int>()
    private val lictionsEvents = mutableMapOf<String, List<EventDto>>()
    private val lectionsPollStatsDto = mutableMapOf<String, PollStatDto>()
    private val lectionsWithCurrentEvent = mutableMapOf<String, Int>()


    fun saveEvents(uuid: String, events: List<EventDto>) {
        lictionsEvents[uuid] = events
    }

    fun sendAnswer(lectionId: String, pollId: Int, answer: PollAnswerDto) {
        val event = lictionsEvents[lectionId]?.find { it.id == pollId }
            ?: throw IllegalArgumentException("Event with id $pollId not found")
        val stat = lectionsPollStatsDto[lectionId] ?: PollStatDto()
        stat.connectedUsersCount = lectionsWithConnectedUsersCount[lectionId] ?: 0
        stat.completedPollCount += 1
        if (answer.answer == event.answers[event.correctAnswerId]) {
            stat.correctResponsesCount += 1
        }
    }

    fun getLectionEvents(lectionId: String): List<EventDto>? {
        return lictionsEvents[lectionId]
    }

    fun getStat(lectionId: String, pollId: Int): PollStatDto {
        val stat = lectionsPollStatsDto[lectionId] ?: throw IllegalArgumentException("Poll with id $pollId not found")
        stat.connectedUsersCount = lectionsWithConnectedUsersCount[lectionId] ?: 0
        return stat
    }

    fun startEvent(lectionId: String, eventId: Int) {
        val event = lictionsEvents[lectionId]?.find { it.id == eventId }
            ?: throw IllegalArgumentException("Event with id $eventId not found")
        lectionsWithCurrentEvent[lectionId] = eventId
        lectionsPollStatsDto[lectionId] = PollStatDto()

        if (event.timeout != null) {
            Timer().schedule(object : TimerTask() {
                override fun run() {
                    lectionsWithCurrentEvent.remove(lectionId)
                    lectionsPollStatsDto.remove(lectionId)
                }
            }, event.timeout * 1000)
        }
    }

    fun stopEvent(lectionId: String) {
        lectionsWithCurrentEvent.remove(lectionId)
        lectionsPollStatsDto.remove(lectionId)
    }

    fun isCurrentEvent(lectionId: String, eventId: Int): Boolean {
        return lectionsWithCurrentEvent[lectionId] == eventId
    }

    fun updateConnectedUsers(lectionId: String, count: Int) {
        lectionsWithConnectedUsersCount[lectionId] = count
    }
}
