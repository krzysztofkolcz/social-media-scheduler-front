export const loadState = (key:any,defaultValue:any) => {
    try{
        const serializedState = sessionStorage.getItem(key)
        if(serializedState  === null){
            return defaultValue
        }
        return JSON.parse(serializedState)

    }catch(error){
        return defaultValue;
    }

}

export const saveState = (key:any,obj:any) => {
    try{
        sessionStorage.setItem(key,JSON.stringify(obj))
    }catch(error){
    }
}