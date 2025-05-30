package authentication.data.user

import com.sundriedham.permission.Role

data class User(
    val username: String,
    val password: String,
    val salt: String,
    val userid: Identifier<User>,
    val roles: Set<Role>
)