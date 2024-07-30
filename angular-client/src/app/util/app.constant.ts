const permissionList: any = [
    {
        key: 'home',
        name: 'Home',
        access: {
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
    // {
    //     key: 'new-wave',
    //     name: 'New Wave',
    //     submodule: [
    //         {
    //             key: 'parentTech',
    //             name: 'Parent Technology',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'technology',
    //             name: 'Technology',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'forum',
    //             name: 'Forum',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'quiz',
    //             name: 'Quiz',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         }
    //     ],
    //     access: {
    //         super: {
    //             view: true,
    //         },
    //         admin: {
    //             view: true,
    //         },
    //         viewer: {
    //             view: true,
    //         },
    //         editor: {
    //             view: true,
    //         }
    //     }
    // },
    // {
    //     key: 'htmlcss',
    //     name: 'Html & CSS',
    //     submodule: [
    //         {
    //             key: 'html',
    //             name: 'HTML',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'css',
    //             name: 'CSS',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'bootstrap',
    //             name: 'Bootstrap',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'saas',
    //             name: 'SaaS',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //     ],
    //     access: {
    //         super: {
    //             view: true,
    //         },
    //         admin: {
    //             view: true,
    //         },
    //         viewer: {
    //             view: true,
    //         },
    //         editor: {
    //             view: true,
    //         }
    //     }
    // },
    // {
    //     key: 'js',
    //     name: 'JavaScript',
    //     submodule: [
    //         {
    //             key: 'javascript',
    //             name: 'JavaScript',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'reactjs',
    //             name: 'ReactJS',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'vue',
    //             name: 'Vue',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'json',
    //             name: 'JSON',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'ajax',
    //             name: 'AJAX',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'angular',
    //             name: 'Angular',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'electronjs',
    //             name: 'Electron JS',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'typescript',
    //             name: 'TpeScript',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //     ],
    //     access: {
    //         super: {
    //             view: true,
    //         },
    //         admin: {
    //             view: true,
    //         },
    //         viewer: {
    //             view: true,
    //         },
    //         editor: {
    //             view: true,
    //         }
    //     }
    // },
    // {
    //     key: 'backend',
    //     name: 'Backend',
    //     submodule: [
    //         {
    //             key: 'python',
    //             name: 'Python',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'php',
    //             name: 'PHP',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'java',
    //             name: 'Java',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'csharp',
    //             name: 'C#',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'django',
    //             name: 'Django',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'asp',
    //             name: 'ASP',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'nodejs',
    //             name: 'NodeJS',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'git',
    //             name: 'Git',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'awscloud',
    //             name: 'AWS Cloud',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'c',
    //             name: 'C',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'cplus',
    //             name: 'C+',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //     ],
    //     access: {
    //         super: {
    //             view: true,
    //         },
    //         admin: {
    //             view: true,
    //         },
    //         viewer: {
    //             view: true,
    //         },
    //         editor: {
    //             view: true,
    //         }
    //     }
    // },
    // {
    //     key: 'database',
    //     name: 'Database',
    //     submodule: [
    //         {
    //             key: 'mongodb',
    //             name: 'MongoDB',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'postgresql',
    //             name: 'PostgreSQL',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'mysql',
    //             name: 'MySQL',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'sql',
    //             name: 'SQL',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'sqlite',
    //             name: 'SQLite',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //     ],
    //     access: {
    //         super: {
    //             view: true,
    //         },
    //         admin: {
    //             view: true,
    //         },
    //         viewer: {
    //             view: true,
    //         },
    //         editor: {
    //             view: true,
    //         }
    //     }
    // },
    // {
    //     key: 'mobile',
    //     name: 'Mobile',
    //     submodule: [
    //         {
    //             key: 'ionic',
    //             name: 'Ionic',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'flutter',
    //             name: 'Flutter',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'reactnative',
    //             name: 'React Native',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'android',
    //             name: 'Android',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'ios',
    //             name: 'iOS',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //     ],
    //     access: {
    //         super: {
    //             view: true,
    //         },
    //         admin: {
    //             view: true,
    //         },
    //         viewer: {
    //             view: true,
    //         },
    //         editor: {
    //             view: true,
    //         }
    //     }
    // },
    // {
    //     key: 'dataAnalytics',
    //     name: 'Data Analytics',
    //     submodule: [
    //         {
    //             key: 'ai',
    //             name: 'AI',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'ml',
    //             name: 'Machine Learning',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'numpy',
    //             name: 'NumPy',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'pandas',
    //             name: 'Pandas',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'matplotlib',
    //             name: 'MatPlotLib',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'scipy',
    //             name: 'SciPy',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //         {
    //             key: 'dataScience',
    //             name: 'Data Science',
    //             access: {
    //                 super: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 admin: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: true,
    //                     download: true,
    //                     upload: true,
    //                 },
    //                 viewer: {
    //                     view: true,
    //                     add: false,
    //                     edit: false,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 },
    //                 editor: {
    //                     view: true,
    //                     add: true,
    //                     edit: true,
    //                     delete: false,
    //                     download: false,
    //                     upload: false,
    //                 }
    //             }
    //         },
    //     ],
    //     access: {
    //         super: {
    //             view: true,
    //         },
    //         admin: {
    //             view: true,
    //         },
    //         viewer: {
    //             view: true,
    //         },
    //         editor: {
    //             view: true,
    //         }
    //     }
    // },
    {
        key: 'setting',
        name: 'Settings',
        submodule: [
            {
                key: 'role',
                name: 'Role',
                access: {
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

export const appConstants: any = {
    permissionList: permissionList
}