export class TextUtils {

    static truncate = (value: string, length=75) => {

        // Set the limit to truncated
        let limit = length;
    
        // Truncate string if its greater than the limit
        if(value){
            return value.length > limit ? value.substring(0, limit) + "..." : value;
        }
    
        else{
            return value;
        }
    
    }
}