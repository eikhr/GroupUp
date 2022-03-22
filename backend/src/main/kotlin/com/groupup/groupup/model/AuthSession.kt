package com.groupup.groupup.model

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import java.util.UUID
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.OneToOne
import javax.persistence.Table

/**
 * Authentication session, contains a user and an api-token.
 */
@Entity
@Table(name = "authsessions")
class AuthSession {
    @OneToOne
    val user: User

    @Id
    val token: String

    @JsonCreator
    constructor(@JsonProperty("user") user: User, @JsonProperty("token") token: String) {
        this.user = user
        this.token = token
    }

    constructor(user: User) {
        this.user = user
        token = UUID.randomUUID().toString()
    }

    val isValid: Boolean
        get() = true
}
