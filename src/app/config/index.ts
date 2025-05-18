
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    node_env: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

    admin_id: process.env.ADMIN_ID,
    admin_name: process.env.ADMIN_NAME,
    admin_email: process.env.ADMIN_EMAIL,
    admin_phone_number: process.env.ADMIN_PHONE_NUMBER,
    admin_address: process.env.ADMIN_ADDRESS,
    admin_image: process.env.ADMIN_IMAGE,
    admin_password: process.env.ADMIN_PASSWORD,
}