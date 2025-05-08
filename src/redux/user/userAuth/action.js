export let user_login = (data) => {
    console.log('function called :', data )
    return {
        type:'USER_LOGIN',
        data
    }
}