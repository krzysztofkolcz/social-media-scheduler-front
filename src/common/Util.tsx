

export function validatePassword (password: FormDataEntryValue | null) :[boolean, string] {
    const regex = new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/");
    console.log(password)
    let passwordValue = password==null?"":password.toString()
    console.log(passwordValue)
    if (password == null ){
      console.log("111")
      return [false, "ms"]
    }
    if(passwordValue == ""){
      console.log("222")
      return [false,"Password cannot be empty"]
    }
    // if(!regex.test(passwordValue)) {
    //   console.log("333")
    //   return [false,"Password should contains at least 1 number, 1 special character, 1 uppercase and 1 lowercase letter"]
    // }
    console.log("444")
    return [true,""]
  }


export function returnSeveralDataInTuple(): [string, number] {
    const data: [string, number] = ["valeur 1", 2]

    return data
}
