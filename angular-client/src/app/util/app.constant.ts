const permissionList: any = [
    {
        key: 'home',
        name: 'Home',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
                // setReady: { value: 'setReady', label: 'Set Ready', index: 7 },
                // publish: { value: 'publish', label: 'Publish', index: 8 },
                // resetPassword: { value: 'resetPassword', label: 'Reset Password', index: 9 }
            },
            super: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
                // setReady: { value: 'setReady', label: 'Set Ready', index: 7 },
                // publish: { value: 'publish', label: 'Publish', index: 8 },
                // resetPassword: { value: 'resetPassword', label: 'Reset Password', index: 9 }
            },
            admin: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            viewer: {
                view: true,
                add: false,
                edit: false,
                delete: false,
                download: false,
                upload: false,
            },
            editor: {
                view: true,
                add: true,
                edit: true,
                delete: false,
                download: false,
                upload: false,
            }
        }
    },
    {
        key: 'banks',
        name: 'Banks',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            super: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            admin: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            viewer: {
                view: true,
                add: false,
                edit: false,
                delete: false,
                download: false,
                upload: false,
            },
            editor: {
                view: true,
                add: true,
                edit: true,
                delete: false,
                download: false,
                upload: false,
            }
        }
    },
    {
        key: 'merchant',
        name: 'Merchant',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            super: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            admin: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            viewer: {
                view: true,
                add: false,
                edit: false,
                delete: false,
                download: false,
                upload: false,
            },
            editor: {
                view: true,
                add: true,
                edit: true,
                delete: false,
                download: false,
                upload: false,
            }
        }
    },
    {
        key: 'deposit',
        name: 'Deposit',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            super: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            admin: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            viewer: {
                view: true,
                add: false,
                edit: false,
                delete: false,
                download: false,
                upload: false,
            },
            editor: {
                view: true,
                add: true,
                edit: true,
                delete: false,
                download: false,
                upload: false,
            }
        }
    },
    {
        key: 'payout',
        name: 'payout',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            super: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            admin: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            },
            viewer: {
                view: true,
                add: false,
                edit: false,
                delete: false,
                download: false,
                upload: false,
            },
            editor: {
                view: true,
                add: true,
                edit: true,
                delete: false,
                download: false,
                upload: false,
            }
        }
    },
    {
        key: 'setting',
        name: 'Settings',
        submodule: [
            {
                key: 'role',
                name: 'Role',
                access: {
                    supersuper: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    },
                    super: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    },
                    admin: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    },
                    viewer: {
                        view: true,
                        add: false,
                        edit: false,
                        delete: false,
                        download: false,
                        upload: false,
                    },
                    editor: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: false,
                        download: false,
                        upload: false,
                    }
                }
            },
            {
                key: 'users',
                name: 'Users',
                access: {
                    supersuper: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    },
                    super: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    },
                    admin: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    },
                    viewer: {
                        view: true,
                        add: false,
                        edit: false,
                        delete: false,
                        download: false,
                        upload: false,
                    },
                    editor: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: false,
                        download: false,
                        upload: false,
                    }
                }
            },
            {
                key: 'permission',
                name: 'Permission',
                access: {
                    supersuper: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    },
                    super: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    },
                    admin: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    },
                    viewer: {
                        view: true,
                        add: false,
                        edit: false,
                        delete: false,
                        download: false,
                        upload: false,
                    },
                    editor: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: false,
                        download: false,
                        upload: false,
                    }
                }
            },
        ],
        access: {
            supersuper: {
                view: true,
            },
            super: {
                view: true,
            },
            admin: {
                view: true,
            },
            viewer: {
                view: true,
            },
            editor: {
                view: true,
            }
        }
    }
]

const superList: any = [
    {
        key: 'home',
        name: 'Home',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            }
        }
    },
    {
        key: 'banks',
        name: 'Banks',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            }
        }
    },
    {
        key: 'merchant',
        name: 'Merchant',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            }
        }
    },
    {
        key: 'deposit',
        name: 'Deposit',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            }
        }
    },
    {
        key: 'payout',
        name: 'payout',
        access: {
            supersuper: {
                view: true,
                add: true,
                edit: true,
                delete: true,
                download: true,
                upload: true,
            }
        }
    },
    {
        key: 'setting',
        name: 'Settings',
        submodule: [
            {
                key: 'role',
                name: 'Role',
                access: {
                    supersuper: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    }
                }
            },
            {
                key: 'users',
                name: 'Users',
                access: {
                    supersuper: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    }
                }
            },
            {
                key: 'permission',
                name: 'Permission',
                access: {
                    supersuper: {
                        view: true,
                        add: true,
                        edit: true,
                        delete: true,
                        download: true,
                        upload: true,
                    }
                }
            },
        ],
        access: {
            supersuper: {
                view: true,
            },
            admin: {
                view: true,
            },
            viewer: {
                view: true,
            },
            editor: {
                view: true,
            }
        }
    }
]

export const appConstants: any = {
    permissionList: permissionList,
    superList
}