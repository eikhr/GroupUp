package com.groupup.groupup.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

private const val MIN_AGE = 18
private const val MAX_AGE = 99

@Entity
@Table(name = "groups")
open class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: Long? = -1

    @Column
    open lateinit var description: String

    @Column
    var minAge: Int = MIN_AGE

    @Column
    var maxAge: Int = MAX_AGE
}