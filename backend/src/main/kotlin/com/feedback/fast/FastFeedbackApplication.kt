package com.feedback.fast

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@EnableScheduling
@SpringBootApplication
class FastFeedbackApplication

fun main(args: Array<String>) {
    runApplication<FastFeedbackApplication>(*args)
}
