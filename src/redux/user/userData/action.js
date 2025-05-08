export let update_profile = (data)=> {
    return {
        type: 'UPDATE_USER_PROFILE',
        data
    }

}
export let refreshContacts = (data)=> {
    return {
        type: "REFRESH_CONTACTS",
        data
    }
}

export let set_state = (data)=>{
    return {
        type:'SET_STATE',
        data
    }
}
export let user_auth = (data)=> {
    return {
        type:'USER_LOGIN',
        data
    }
}