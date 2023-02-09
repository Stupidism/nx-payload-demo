import type { Access } from 'payload/config';
import type { CollectionConfig, FieldAccess } from 'payload/types';

export enum UserRole {
  admin = 'admin',
  editor = 'editor',
  developer = 'developer',
  translator = 'translator',
  user = 'user',
}

const manageUserAccess = (({ req }) => {
  const user = req.user;

  if (!user) return false;
  // return true // to permit access

  // return a query to call on the collection for dynamic control
  return {
    or: [
      {
        id: {
          equals: user.id,
        },
      },
      {
        role: {
          equals: UserRole.admin,
        },
      },
    ],
  };
}) as Access;

const manageUserRoleAccess: FieldAccess = ({ req }) => {
  if (!req.user) return false;

  const user = req.user;

  const userRoles = user.roles as UserRole[];

  return userRoles?.includes(UserRole.admin);
};

export const Users: CollectionConfig = {
  slug: 'users',

  // any collection can have auth enabled, and may have more than one
  // by enabling auth, the API adds more routes for api/users like /login, /forgot-password, and more
  // here we configure auth settings in an object, instead use "auth: true" to accept all defaults
  auth: {
    // useAPIKey will add a generated token visible to the user in the admin UI that can then be used to make API requests
    useAPIKey: true,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles'],
    enableRichTextRelationship: false,
    group: 'Settings',
  },
  access: {
    // allow all get requests to /api/users or the equivalent graphQL query
    read: () => true,
    create: manageUserAccess,
    // create is allowed by default for authenticated users
    // update and delete access is restricted for demo
    update: manageUserAccess,
    delete: manageUserAccess,
  },
  // auth enabled collections get email and other fields for secure authentication in addition to the fields you add
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      // saveToJWT tells Payload to include the field data to the JSON web token used to authenticate users
      saveToJWT: true,
    },
    {
      name: 'roles',
      label: 'Role',
      type: 'select',
      options: Object.values(UserRole),
      defaultValue: [UserRole.user],
      required: true,
      saveToJWT: true,
      hasMany: true,
      access: {
        read: manageUserRoleAccess,
        update: manageUserRoleAccess,
        create: manageUserRoleAccess,
      },
    },
  ],
};
