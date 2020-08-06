// const person: {
//   name: string;
//   age: number;
// } = {

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "Klevin",
  age: 22,
  hobbies: ["Sports, Cooking"],
  role: Role.ADMIN,
};

// person.role.push("admin"); // TS dont catch an error here
// person.role[1] = 10;
// person.role = [0, "admin"];

let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
