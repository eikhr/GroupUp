package com.groupup.groupup.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
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
    open lateinit var name: String

    @Column
    open lateinit var description: String

    @Column
    var minAge: Int = MIN_AGE

    @Column
    var maxAge: Int = MAX_AGE

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "group_events",
        joinColumns = [JoinColumn(name = "group_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "event_id", referencedColumnName = "id")]
    )
    @JsonIgnoreProperties("groups")
    open var events: MutableList<Event> = mutableListOf()
}
