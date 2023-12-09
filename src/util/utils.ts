

//function to compare if the second object has the value pairs of the first obj
//@params { [key: string]: number } - obj1, obj2 : objects to do the matching with
export function objCompare(
  obj1: { [key: string]: number },
  obj2: { [key: string]: Number }
) {
  //get the list of keys of the obj1
  let keys: string[] = Object.keys(obj1);
  //check the key-value pairs for both objects.
  for (const key of keys) {
    //if a key-value pair is mismatched > return false
    if (obj1[key] !== obj2[key]) return false;
  }
  //all key-value pairs match > return true
  return true;
}