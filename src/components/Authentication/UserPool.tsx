import {CognitoUserPool, } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-central-1_RDs64szop",
    ClientId: "18v7n94mv4rdttj95v2i4p35uc"
}

export default new CognitoUserPool(poolData);