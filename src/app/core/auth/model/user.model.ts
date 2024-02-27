export type SystemFeature = 'USER'| 'ROLE' | 'CUSTOMER' | 'LICENSE' | 'ORGANISATION' | 'SKILL' | 'PROFILE' | 'TEMPLATE';

//by now are not being used but may be is a good option for some things on the future
// export interface SystemPrivilege {
//   feature: SystemFeature;
//   view: boolean;
//   create: boolean;
//   update: boolean;
//   delete: boolean;
// }

export type SystemPrivilege =
    'SUPER_ADMIN' |
    'CREATE_USER' |
    'VIEW_USER' |
    'UPDATE_USER' |
    'DELETE_USER' |
    'CREATE_CUSTOMER' |
    'VIEW_CUSTOMER' |
    'UPDATE_CUSTOMER' |
    'DELETE_CUSTOMER' |
    'CREATE_ORGANISATION' |
    'VIEW_ORGANISATION' |
    'UPDATE_ORGANISATION' |
    'DELETE_ORGANISATION' |
    'CREATE_ROLE' |
    'VIEW_ROLE' |
    'UPDATE_ROLE' |
    'DELETE_ROLE' |
    'CREATE_PROFILE' |
    'VIEW_PROFILE' |
    'UPDATE_PROFILE' |
    'DELETE_PROFILE' |
    'CREATE_TEMPLATE' |
    'VIEW_TEMPLATE' |
    'UPDATE_TEMPLATE' |
    'DELETE_TEMPLATE' |
    'CREATE_SKILL' |
    'VIEW_SKILL' |
    'UPDATE_SKILL' |
    'DELETE_SKILL' |
    'CREATE_LICENSE' |
    'VIEW_LICENSE' |
    'UPDATE_LICENSE' |
    'DELETE_LICENSE';

//by now is the same that the decoded access token
export interface UserSession {
  id: number;
  customerId: number;
  organisationId: number;
  emailAddress: string;
  privileges: SystemPrivilege[];
  roleIds: number[];
  iat: number;
  exp: number;
  firstName?: string;
  lastName?: string;
}

export interface UserData {
  id: number;
  customerId: number;
  organisationId: number;
  firstName: string;
  lastName: string
  emailAddress: string;
  privileges: SystemPrivilege[];
  roleIds: number[];
  //Not being used on the BE by now
  password?: string,
  locked?: boolean,
  enabled?: boolean,
}

export interface SimplifiedUserData extends Omit<UserData, 'customerId' | 'organisationId' | 'privileges' | 'roleIds' | 'password'> {
  roleNames: string[];
}


export const PRIVILEGE_LIST = [
    "SUPER_ADMIN",
    "CREATE_USER",
    "VIEW_USER",
    "UPDATE_USER",
    "DELETE_USER",
    "CREATE_CUSTOMER",
    "VIEW_CUSTOMER",
    "UPDATE_CUSTOMER",
    "DELETE_CUSTOMER",
    "CREATE_ORGANISATION",
    "VIEW_ORGANISATION",
    "UPDATE_ORGANISATION",
    "DELETE_ORGANISATION",
    "CREATE_ROLE",
    "VIEW_ROLE",
    "UPDATE_ROLE",
    "DELETE_ROLE",
    "CREATE_PROFILE",
    "VIEW_PROFILE",
    "UPDATE_PROFILE",
    "DELETE_PROFILE",
    "CREATE_TEMPLATE",
    "VIEW_TEMPLATE",
    "UPDATE_TEMPLATE",
    "DELETE_TEMPLATE",
    "CREATE_SKILL",
    "VIEW_SKILL",
    "UPDATE_SKILL",
    "DELETE_SKILL",
    "CREATE_LICENSE",
    "VIEW_LICENSE",
    "UPDATE_LICENSE",
    "DELETE_LICENSE"
  ]
