package com.feedback.fast

import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class FastFeedbackApplicationTests {

	@Test
	fun contextLoads() {
		1 + 1 shouldBe 2
	}

}
