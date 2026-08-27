import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UsuarioCargo extends Model{
    declare id_usuario: number;
    declare id_cargo: number;
}

UsuarioCargo.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_cargo: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    sequelize,
    tableName: "usuario_cargo",
    timestamps: false
});

export default UsuarioCargo;