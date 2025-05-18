


import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
    id: config.admin_id,
    name: config.admin_name,
    email: config.admin_email,
    phoneNumber: config.admin_phone_number,
    address: config.admin_address,
    password: config.admin_password,
    role: USER_ROLE.admin,
};

const seedAdmin = async () => {
    //when database is connected, we will check is there any user who is super admin
    const isSuperAdminExits = await User.findOne({ role: USER_ROLE.admin });

    if (!isSuperAdminExits) {
        await User.create(superUser);
    }
};

export default seedAdmin;