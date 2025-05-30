package com.sundriedham.authentication.data.db


import authentication.data.user.Identifier
import authentication.data.user.User
import com.sundriedham.permission.RoleBinary
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import java.util.*

object UserTable : UUIDTable("usertable") {
    val username = varchar("username", 64)
    val password = varchar("password", 64)
    val salt = varchar("salt", 64)
}

object Roles : IdTable<UUID>("roles"){
    override val id: Column<EntityID<UUID>> = reference("id", foreign = UserTable)
    override val primaryKey = PrimaryKey(id)
    val role = binary("role",16)

}

class UserDAO(userid: EntityID<UUID>) : UUIDEntity(userid) {
    object Query : UUIDEntityClass<UserDAO>(UserTable)

    var username by UserTable.username
    var password by UserTable.password
    var salt by UserTable.salt
}

class RolesDao(roles: EntityID<UUID>) : UUIDEntity(roles){
    object Query : UUIDEntityClass<RolesDao>(Roles)

    var role by Roles.role
}

fun daoToModel(dao: UserDAO) = User(
    username = dao.username,
    password = dao.password,
    salt = dao.salt,
    userid = Identifier(dao.id.value)
)

fun roleDaotoModel(dao: RolesDao)= RoleBinary(
    id = dao.id.value,
    role = dao.role
)

suspend fun <T> suspendTransaction(block: Transaction.() -> T): T = newSuspendedTransaction(
    Dispatchers.IO, statement = block
)