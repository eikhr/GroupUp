package com.groupUp.groupUp.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "events")
class Event() {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var id: Long = -1
    @Column(name = "name", nullable = false)
    var name: String? = null

    constructor(id: Long) : this() {
        this.id = id
    }

    fun getId(): Long {
        return this.id
    }

    override fun toString(): String {
        return this.id.toString() + " " + this.name
    }
}
