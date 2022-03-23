package com.groupup.groupup.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
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
    open var id: Long = -1

    @Column(unique = true)
    open lateinit var username: String
    @Column
    @JsonIgnore
    open lateinit var password: String
    @Column
    open lateinit var firstName: String
    @Column
    open lateinit var lastName: String
    @Column
    open lateinit var email: String

    /**
     * Create a new User.
     *
     * @param username The username of the user
     * @param password The password of the user
     * @param hash Whether or not the password should be hashed before setting it
     */
    constructor(
        username: String,
        password: String,
        hash: Boolean,
        firstName: String,
        lastName: String,
        email: String
    ) : super() {
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
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

    @ManyToMany(mappedBy = "usersRequestingMembership")
    @JsonIgnoreProperties("usersRequestingMembership")
    open var groupMembershipRequests: MutableList<Group> = mutableListOf()
}
