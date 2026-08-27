import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class CargoPermissao extends Model{
    declare id_cargo: number;
    declare id_permissao: number;
}

CargoPermissao.init({
    id_cargo: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_permissao: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    sequelize,
    tableName: "cargo_permissao",
    timestamps: false
});

export default CargoPermissao;