package com.groupup.groupup

interface IController {
    fun apiUrl(vararg segments: String): String
}
