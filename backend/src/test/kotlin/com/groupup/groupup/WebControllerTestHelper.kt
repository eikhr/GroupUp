package com.groupup.groupup

abstract class WebControllerTestHelper {
    fun apiUrl(vararg segments: String): String {
        val url = StringBuilder("/" + "api")
        for (segment in segments) {
            url.append("/").append(segment)
        }
        println(url)
        return url.toString()
    }
}
