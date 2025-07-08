package com.sundriedham.authentication.data.db


import authentication.data.user.Identifier
import authentication.data.user.User
import com.sundriedham.permission.Role
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import java.util.*

object UserTable : UUIDTable("usertable") {
    val username = varchar("username", 64)
    val password = varchar("password", 64)
    val salt = varchar("salt", 64)
    val roles = integer("roles")
}


class UserDAO(userid: EntityID<UUID>) : UUIDEntity(userid) {
    object Query : UUIDEntityClass<UserDAO>(UserTable)

    var username by UserTable.username
    var password by UserTable.password
    var salt by UserTable.salt
    var roles by UserTable.roles
}

fun UserDAO.toModel(): User {
    val roles = Role.getRolesFromBitmask(this.roles)
    return User(
        username = this.username,
        password = this.password,
        salt = this.salt,
        roles = roles,
        userid = Identifier(this.id.value)
    )
}

//fun User.toDAO(): UserDAO {
//
//}


suspend fun <T> suspendTransaction(block: Transaction.() -> T): T = newSuspendedTransaction(
    Dispatchers.IO, statement = block
)