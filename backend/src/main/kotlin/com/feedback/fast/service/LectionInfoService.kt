package com.feedback.fast.service

import org.springframework.stereotype.Service

@Service
class LectionInfoService {
    private val lectionsWithUserCount = mutableMapOf<String, Long>()

    fun createLection(uuid: String) {
        lectionsWithUserCount[uuid] = 0
    }

    fun isLectionStarted(uuid: String): Boolean {
        return lectionsWithUserCount[uuid]?.let {
            lectionsWithUserCount[uuid] = it + 1
            true
        } ?: false
    }
}

