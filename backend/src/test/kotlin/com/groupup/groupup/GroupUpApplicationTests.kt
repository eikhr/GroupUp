package com.groupup.groupup

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class GroupUpApplicationTests {
    @Test
    fun contextLoads() {
        assertThat(true).isTrue
    }
}
