export const ADD =(item)=>{
    return {
        type:'ADD_CART',
        payload:item
    }
}

export const REMOVEITEM =(id,option)=>{
    return {
        type:'REMOVE_ITEM',
        payload:{
            id:id,
            option:option
        }
    }
}

export const EMPTYCART =()=>{
    return {
        type:'EMPTY_CART',
    }
}
