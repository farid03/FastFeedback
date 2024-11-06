package com.feedback.fast.service

import org.springframework.stereotype.Service
import java.util.*

@Service
class UuidGeneratorService {
    fun generateUuid(length: Int = 10): String {
        require(length <= 32) { "Запрашиваемая длина превышает длину UUID" }

        return UUID.randomUUID()
            .toString()
            .replace("-", "")
            .take(length)
    }
}
