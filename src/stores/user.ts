import { defineStore } from "pinia";
import { ref } from "vue";
import {Auth} from "@aws-amplify/auth";

export const useUserStore = defineStore('user', () => {
    const user = ref('')

    const setUser = (newUser: any) => {
        user.value = newUser
    }

    const signIn = async (username : string, password : string) => {
        try {
            const user = await Auth.signIn(username, password)
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                Auth.completeNewPassword(
                    user,               // the Cognito User Object
                    'testingtesting',       // the new password
                    // OPTIONAL, the required attributes
                    {
                        email: 'xxxx@example.com',
                    }
                ).then(user => {
                    // at this time the user is logged in if no MFA required
                    console.log(user);
                }).catch(e => {
                    console.log(e);
                });
            }

            console.log('user', user, user.challengeParam)
            setUser(user)
            // Auth
            //     .currentAuthenticatedUser({ bypassCache: false })
            //     .then(user => setUser(user))
            //     .catch(err => console.log(err));
        } catch (e) {
            console.error(e)
        }
    }

    const signOut = async () => {
        try {
            await Auth.signOut()
            setUser('')
        } catch (e) {
            console.log('Failed logout', e)
        }
    }

    return {
        user,
        setUser,
        signIn,
        signOut
    }
})