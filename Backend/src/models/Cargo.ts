import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Cargo extends Model{
    declare id_cargo: number;
    declare nome: string;
}

Cargo.init({
    id_cargo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    tableName: "cargo",
    timestamps: false
});

export default Cargo;