package com.groupup.groupup.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty
import java.nio.charset.StandardCharsets
import java.security.MessageDigest
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.Table
import kotlin.experimental.and

private const val RADIX = 16
private const val WEIRD_HEX_BYTE = 0x100

/**
 * Class for representing a user.
 */
@Entity
@Table(name = "users")
open class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @Column
    open lateinit var username: String
    @Column
    open lateinit var password: String
    @Column
    open lateinit var firstName: String
    @Column
    open lateinit var lastName: String

    constructor(
        @JsonProperty("username") username: String,
        @JsonProperty("password") password: String
    ) {
        this.username = username
        this.password = password
    }

    /**
     * Create a new User.
     *
     * @param username The username of the user
     * @param password The password of the user
     * @param hash Whether or not the password should be hashed before setting
     */
    constructor(username: String, password: String, hash: Boolean) : super() {
        this.username = username
        if (hash) {
            hashAndSetPassword(password)
        } else {
            this.password = password
        }
    }

    fun hashAndSetPassword(password: String) {
        require(password != "") { "Password cannot be empty" }
        this.password = md5Hash(password)
    }

    fun checkPassword(password: String): Boolean {
        return md5Hash(password) == this.password
    }

    private fun md5Hash(password: String): String {
        val md = MessageDigest.getInstance("MD5")
        md.update(password.toByteArray(StandardCharsets.UTF_8))
        val bytes = md.digest()
        val sb = StringBuilder()
        for (i in bytes.indices) {
            sb.append(((bytes[i] and 0xff.toByte()) + WEIRD_HEX_BYTE).toString(RADIX).substring(1))
        }
        return sb.toString()
    }
    @ManyToMany(mappedBy = "users")
    @JsonIgnoreProperties("users")
    open var groups: MutableList<Group> = mutableListOf()
}
