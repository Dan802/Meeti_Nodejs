import Categories from "./Categories.js";
import Groups from "./Groups.js";
import Users from "./Users.js";

//* Here should import and export ALL the models, so in the index will sync correctly

// 1:1 => 1 group can only have 1 category
Groups.belongsTo(Categories)

// 1:1 => 1 group can only have 1 admin
Groups.belongsTo(Users)

export {
    Categories,
    Groups,
    Users
}