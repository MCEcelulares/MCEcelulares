import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Permissao extends Model{
    declare id_permissao: number;
    declare nome: string;
}

Permissao.init({
    id_permissao: {
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
    tableName: "permissao",
    timestamps: false
});

export default Permissao;