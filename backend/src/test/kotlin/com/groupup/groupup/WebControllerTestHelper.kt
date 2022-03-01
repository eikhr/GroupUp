package com.groupup.groupup

interface WebControllerTestHelper {
    fun apiUrl(vararg segments: String): String {
        val url = StringBuilder("/" + "api")
        for (segment in segments) {
            url.append("/").append(segment)
        }
        println(url)
        return url.toString()
    }
}
