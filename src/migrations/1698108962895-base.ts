import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1698108962895 implements MigrationInterface {
    name = 'Base1698108962895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), INDEX \`IDX_6620cd026ee2b231beac7cfe57\` (\`role\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meal\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`rating\` decimal(3,2) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`chefId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`meal\` ADD CONSTRAINT \`FK_223ccf74531077d372d24c30f85\` FOREIGN KEY (\`chefId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`meal\` DROP FOREIGN KEY \`FK_223ccf74531077d372d24c30f85\``);
        await queryRunner.query(`DROP TABLE \`meal\``);
        await queryRunner.query(`DROP INDEX \`IDX_6620cd026ee2b231beac7cfe57\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
