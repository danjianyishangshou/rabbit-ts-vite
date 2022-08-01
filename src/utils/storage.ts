import { Profile } from '@/types/user'
const PROFILE_kEY = 'xtx-rabbit-demo'
export const setProfile = (profile: Profile): void => {
    localStorage.setItem(PROFILE_kEY, JSON.stringify(profile))
}

export const getProfile = (): Profile => {
    return JSON.parse(localStorage.getItem(PROFILE_kEY) || '{}')
}

export const removeProfile = (): void => {
    localStorage.removeItem(PROFILE_kEY)
}